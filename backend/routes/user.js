const express = require("express");
const router = express.Router();
const { User: Controller } = require("../controllers");

const controller = new Controller();

router.get("/:name?", controller.list);
router.get("/:_id", controller.getOne);
router.post("/", controller.create);
router.put("/", controller.update);
router.delete("/:_id", controller.remove);

module.exports = router;
