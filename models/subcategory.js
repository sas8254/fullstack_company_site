const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
