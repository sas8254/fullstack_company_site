const Category = require("../models/Category");
const Subcategory = require("../models/subCategory");

// Controller functions for categories

exports.getCatForm = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.render("add-cats-and-subcats", { categories });
  } catch (error) {
    res.status(500).json({ error: "Error getting categories" });
  }
};

exports.getAllCatsAndSubCats = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.render("all-cats-and-subcats", { categories });
  } catch (error) {
    res.status(500).json({ error: "Error getting categories" });
  }
};

exports.getEditform = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.render("editCategory", { category });
  } catch (error) {
    res.status(500).json({ error: "Error getting categories" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error getting categories" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "subcategories"
    );
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error getting the category" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.redirect("/categories/catForm");
  } catch (error) {
    res.status(400).json({ error: "Error creating the category" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      {
        new: true,
      }
    );
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.redirect("/categories/all-cats");
  } catch (error) {
    res.status(400).json({ error: "Error updating the category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await Subcategory.deleteMany({ _id: { $in: category.subcategories } });

    res.status(200).redirect("/categories/all-cats");
  } catch (error) {
    res.status(500).json({ error: "Error deleting the category" });
  }
};
