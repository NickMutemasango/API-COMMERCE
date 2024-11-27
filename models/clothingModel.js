const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: String, default: "0" },
  price: { type: Number, required: true },
  old_price: { type: Number },
  discount_percentage: { type: Number },
  clothing_description: { type: String },
  clothing_size: { type: String, required: true },
});

module.exports = mongoose.model("Clothing", clothingSchema);
