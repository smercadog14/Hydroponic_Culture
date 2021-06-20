const express = require("express");
const router = express.Router();
const { User: Controller } = require("../controllers");

const controller = new Controller();

router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
