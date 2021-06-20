const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  adequateParams: [{ type: Number, default: 0 }], //params
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
