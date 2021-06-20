const mongoose = require("mongoose");

const sensorSchena = new mongoose.Schema({
  name: String,
  description: String,
  value: Number,
  status: Boolean,
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const Sensor = mongoose.model("sensor", sensorSchena);

module.exports = Sensor;
