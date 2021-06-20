const mongoose = require("mongoose");

const actuatorSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: Boolean,
  turnedOn: { type: Boolean, default: false },
  con_date: { type: Date, default: Date.now }, //configuration day
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const Actuator = new mongoose.model("actuator", actuatorSchema);

module.exports = Actuator;
