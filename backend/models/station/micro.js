const mongoose = require("mongoose");

const microSchema = new mongoose.Schema({
  name: String,
  ref: String,
  description: String,
  status: String,
  sensor: [{ type: mongoose.Schema.ObjectId, ref: "sensor" }],
  actuator: [{ type: mongoose.Schema.ObjectId, ref: "actuator" }],
  tank: [{ type: mongoose.Schema.ObjectId, ref: "tank" }],
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const Micro = mongoose.model("micro", microSchema);

module.exports = Micro;
