const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user/user");
const dataCompleted = require("../../middleware/validateData");
const contract = require("../../contracts/user/login");

router.post("/login", dataCompleted(contract.login), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email or password");

  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!user.active || !hash)
    return res.status(400).send("Incorrect email or password");

  try {
    const jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
});

module.exports = router;
