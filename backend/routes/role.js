const express = require("express");
const router = express.Router();
const { Role: Controller } = require("../controllers");
const { Role: Service } = require("../services");

const controller = new Controller(Service);

router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
module.exports = router;
