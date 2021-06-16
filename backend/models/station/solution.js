const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  name: String,
  description: String,
  concentration: String,
  type: String, //soluto, general
  actParams: [{ type: Number, default: 0 }], //actual paramos of solution
  warning: String,
  recommendation: String,
  compound: [{ type: mongoose.Schema.ObjectId, ref: "compound" }],
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const Solution = mongoose.model("solution", solutionSchema);

module.exports = Solution;
