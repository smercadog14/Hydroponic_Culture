const mongoose = require("mongoose");

const compoundSchema = new mongoose.Schema({
  name: String,
  description: String,
  solubility: String,
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const Compound = new mongoose.model("compound", compoundSchema);

module.exports = Compound;
