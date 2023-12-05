const Subcategory = require("../models/subCategory");
const Category = require("../models/Category");

// Controller functions for subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Error getting subcategories" });
  }
};

exports.getEditform = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ error: "subcategory not found" });
    }
    res.render("editSubcategory", { subcategory });
  } catch (error) {
    res.status(500).json({ error: "Error getting categories" });
  }
};

exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: "Error getting the subcategory" });
  }
};

exports.createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const subcategory = new Subcategory({
      name,
      category: categoryId,
    });
    const savedSubcategory = await subcategory.save();
    const category = await Category.findById(categoryId);
    category.subcategories.push(savedSubcategory._id);
    await category.save();
    res.redirect("/categories/catForm");
  } catch (error) {
    res.status(400).json({ error: "Error creating the subcategory" });
  }
};

exports.updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.redirect("/categories/all-cats");
  } catch (error) {
    res.status(400).json({ error: "Error updating the subcategory" });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndRemove(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    await Category.updateMany({}, { $pull: { subcategories: req.params.id } });

    res.status(200).redirect("/categories/all-cats");
  } catch (error) {
    res.status(500).json({ error: "Error deleting the subcategory" });
  }
};
