const express = require("express");
const router = express.Router();
const { Role: Controller } = require("../controllers");
const { Role: Service } = require("../services");

const controller = new Controller(Service);

router.get("/", controller.list);
router.get("/:_id", controller.getOne);
router.post("/", controller.create);
router.put("/", controller.update);
router.delete("/:_id", controller.remove);

module.exports = router;
