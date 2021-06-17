const express = require("express");
const router = express.Router();
const Role = require("../../models/user/role");
const Admin = require("../../middleware/admin");
const Auth = require("../../middleware/auth");
const UserAuth = require("../../middleware/userDB");
const dataCompleted = require("../../middleware/validateData");
const contract = require("../../contracts/user/role");
const { role: repository } = require("../../repositories");
const { role: controller } = require("../../controllers/index");

router.post("/create", dataCompleted(contract.create), controller.create);





router.get("/list/:name?", Auth, UserAuth, Admin, async (req, res) => {
  const role = await repository.list(req.params.name);

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
    const validId = await repository.validId(req.body._id);

    if (!validId) return res.status(401).send("Error: Invalid id");

    const role = await repository.update(req.body._id, {
      name: req.body.name,
      description: req.body.description,
      active: req.body.active,
    });

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
    let role = await repository.update(req.body._id, {
      name: req.body.name,
      description: req.body.description,
      active: false,
    });

    if (!role) return res.status(400).send("Process failed: Error delete Role");
    return res.status(200).send({ role });
  }
);

router.delete("/:_id", Auth, UserAuth, Admin, async (req, res) => {
  const validId = repository.validId(req.params._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const roleDB = await repository.findById(req.params._id);
  if (!roleDB) return res.status(401).send("Role doesn't exist on db");

  const role = await repository.erase(req.params._id);
  if (!role) return res.status(401).send("Failed to delete role");
  return res.status(200).send({ mensaje: "Role Deleted" });
});

module.exports = router;
