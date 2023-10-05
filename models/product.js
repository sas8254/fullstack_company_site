const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true, // Remove leading/trailing whitespace
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: String, // Optional field
    pdfFile: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps to the schema
  }
);

module.exports = mongoose.model("Product", ProductSchema);
