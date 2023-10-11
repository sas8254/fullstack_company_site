const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcategory: String,
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
