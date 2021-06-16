const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Role = require("../../models/user/role");
const Admin = require("../../middleware/admin");
const Auth = require("../../middleware/auth");
const UserAuth = require("../../middleware/userDB");
const dataCompleted = require("../../middleware/validateData");
const contract = require("../../contracts/user/role");

router.post(
  "/create",
  Auth,
  UserAuth,
  Admin,
  dataCompleted(contract.create),
  async (req, res) => {
    const roleExists = await Role.findOne({ name: req.body.name });
    if (roleExists)
      return res.status(400).send("Process failed: role already exists");

    const role = new Role({
      name: req.body.name,
      description: req.body.description,
      active: true,
    });

    const result = await role.save();
    if (!result) return res.status(401).send("Failed to register role");
    return res.status(200).send({ result });
  }
);

router.get("/list/:name?", Auth, UserAuth, Admin, async (req, res) => {
  const role = await Role.find({
    name: new RegExp(req.params["name"], "i"),
  });
  // .populate()
  // .exec();
  if (!role) return res.status(200).send("No roles were found.");
  return res.status(200).send({ role });
});

router.put(
  "/update",
  Auth,
  UserAuth,
  Admin,
  dataCompleted(contract.update),
  async (req, res) => {
    const validId = mongoose.Types.ObjectId.isValid(req.body._id);
    if (!validId) return res.status(401).send("Error: Invalid id");

    role = await Role.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        description: req.body.description,
        active: req.body.active,
      },
      { new: true }
    );

    if (!role) return res.status(400).send("Error: Could not update role.");
    return res.status(200).send({ message: "Role updated successfully", role });
  }
);

router.put(
  "/delete",
  Auth,
  UserAuth,
  Admin,
  dataCompleted(contract.update),
  async (req, res) => {
    let role = await Role.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      description: req.body.description,
      active: false,
    });

    if (!role) return res.status(400).send("Process failed: Error delete Role");
    return res.status(200).send({ role });
  }
);

router.delete("/:_id", Auth, UserAuth, Admin, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const roleDB = await Role.findById(req.params._id);
  if (!roleDB) return res.status(401).send("Role doesn't exist on db");

  const role = await Role.findByIdAndDelete(req.params._id);
  if (!role) return res.status(401).send("Failed to delete role");
  return res.status(200).send({ mensaje: "Role Deleted" });
});

module.exports = router;
