const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcategory: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
