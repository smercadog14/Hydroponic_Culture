const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  password: String,
  email: { type: String, unique: true },
  phone: String,
  role: { type: mongoose.Schema.ObjectId, ref: "role" },
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      roleId: this.roleId,
      iat: moment().unix(),
    },
    process.env.SECRET_KEY_JWT
  );
};

const User = mongoose.model("user", userSchema);
module.exports = User;
