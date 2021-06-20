const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: String,
  description: String,
  micro: { type: mongoose.Schema.ObjectId, ref: "micro" },
  product: { type: mongoose.Schema.ObjectId, ref: "product" },
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const Station = mongoose.model("station", stationSchema);

module.exports = Station;
