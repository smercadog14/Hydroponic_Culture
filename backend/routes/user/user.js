const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user/user");
const Role = require("../../models/user/role");
const Admin = require("../../middleware/admin");
const Auth = require("../../middleware/auth");
const UserAuth = require("../../middleware/userDB");
const dataCompleted = require("../../middleware/validateData");
const contract = require("../../contracts/user/user");

router.post(
  "/create",
  Auth,
  UserAuth,
  Admin,
  dataCompleted(contract.create),
  async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send("Process failed: The user is already registered");

    const hash = await bcrypt.hash(req.body.password, 10);

    const role = await Role.findOne({ name: "user" });
    if (!role)
      return res.status(400).send("Process failed: No role was assigned");

    user = new User({
      avatar: req.body.avatar,
      name: req.body.name,
      password: hash,
      email: req.body.email,
      phone: req.body.phone,
      roleId: role._id,
      active: true,
    });

    try {
      const result = await user.save();
      if (!result) return res.status(401).send("Failed to register user");
      const jwtToken = user.generateJWT();
      res.status(200).send({ jwtToken });
    } catch (e) {
      return res.status(400).send("Failed to register user");
    }
  }
);

router.post(
  "/Admin",
  Auth,
  UserAuth,
  Admin,
  dataCompleted(contract.create),
  async (req, res) => {
    const validId = mongoose.Types.ObjectId.isValid(req.body.roleId);
    if (!validId) return res.status(401).send("Process failed: Invalid id");

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send("Process failed: The user is already registered");

    const hash = await bcrypt.hash(req.body.password, 10);

    user = new User({
      avatar: req.body.avatar,
      name: req.body.name,
      password: hash,
      email: req.body.email,
      phone: req.body.phone,
      roleId: req.body.roleId,
      active: true,
    });

    try {
      const result = await user.save();
      if (!result) return res.status(401).send("Failed to register user");
      const jwtToken = user.generateJWT();
      res.status(200).send({ jwtToken });
    } catch (e) {
      return res.status(400).send("Failed to register user");
    }
  }
);

router.get("/list/:name?", Auth, UserAuth, Admin, async (req, res) => {
  const users = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec();
  if (!users) return res.status(401).send("Process failed: No users");
  return res.status(200).send({ users });
});

router.put(
  "/update",
  Auth,
  UserAuth,
  Admin,
  dataCompleted(contract.update),
  async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(req.body._id, {
      avatar: req.body.avatar,
      name: req.body.name,
      password: hash,
      email: req.body.email,
      phone: req.body.phone,
      roleId: req.body.roleId,
      active: req.body.active,
    });
    if (!user)
      return res.status(401).send("Process failed: Error editing User");
    return res.status(200).send({ user });
  }
);

router.put(
  "/delete",
  Auth,
  UserAuth,
  Admin,
  dataCompleted(contract.update),
  async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(req.body._id, {
      avatar: req.body.avatar,
      name: req.body.name,
      password: hash,
      email: req.body.email,
      phone: req.body.phone,
      roleId: req.body.roleId,
      active: false,
    });
    if (!user) return res.status(401).send("Process failed: Error delete User");
    return res.status(200).send({ user });
  }
);

router.delete("/:_id", Auth, UserAuth, Admin, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const userDB = await User.findById(req.params._id);
  if (!userDB) return res.status(401).send("User doesn't exist on db");

  const users = await User.findByIdAndDelete(req.params._id);
  if (!users) return res.status(401).send("Failed to delete user");
  return res.status(200).send("User deleted");
});

module.exports = router;
