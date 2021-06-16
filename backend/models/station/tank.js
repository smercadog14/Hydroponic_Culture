const mongoose = require("mongoose");

const tankSchema = new mongoose.Schema({
  name: String,
  description: String,
  height: Number,
  width: Number,
  valueOfFull: Number,
  solution: { type: mongoose.Schema.ObjectId, ref: "solution" },
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const Tank = mongoose.model("tank", tankSchema);

module.exports = Tank;
