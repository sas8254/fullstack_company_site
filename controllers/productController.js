const Product = require("../models/product");
const Category = require("../models/Category");
const fs = require("fs");

const deleteImage = (fileUrl) => {
  const filePath = "./uploads/images/" + fileUrl;

  fs.unlink(filePath, (error) => {
    if (error) {
      throw error;
    }
  });
};

const deletePdf = (fileUrl) => {
  const filePath = "./uploads/pdfs/" + fileUrl;

  fs.unlink(filePath, (error) => {
    if (error) {
      throw error;
    }
  });
};

exports.addProduct = async (req, res) => {
  // return res.send(req.body);
  try {
    const { title, subtitle, category, subcategory } = req.body;
    const newProduct = new Product({
      image: req.files["image"][0].filename,
      title,
      subtitle,
      category,
      subcategory,
      pdfFile: req.files["pdfFile"][0].filename,
    });
    await newProduct.save();
    res.redirect("/products");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.Id);
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    const products = await Product.find({});
    res.render("products", { products, categories });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getAllProductsOfSubcategory = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    const products = await Product.find({
      subcategory: req.params.Id,
    });
    // return res.json({ products });
    res.render("products", { products, categories });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    const product = await Product.findById(req.params.id);
    res.render("editProduct", { product, categories });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getAddForm = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.render("addProduct", { categories });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    // return res.send(req.body);
    let { title, subtitle, category, subcategory } = req.body;
    const foundProduct = await Product.findById(req.params.Id);
    let image, pdfFile;
    if (req.files["image"]) {
      image = req.files["image"][0].filename;
      await deleteImage(foundProduct.image);
    } else {
      image = foundProduct.image;
    }
    if (req.files["pdfFile"]) {
      pdfFile = req.files["pdfFile"][0].filename;
      await deletePdf(foundProduct.pdfFile);
    } else {
      pdfFile = foundProduct.pdfFile;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.Id,
      {
        title,
        subtitle,
        image,
        pdfFile,
        category,
        subcategory,
      },
      { new: true }
    );
    res.redirect("/products");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const removedType = await Product.findByIdAndRemove(req.params.Id);
    if (removedType && removedType.image) {
      await deleteImage(removedType.image);
    }
    if (removedType && removedType.pdfFile) {
      await deletePdf(removedType.pdfFile);
    }

    if (removedType === null) {
      return res.status(500).json("No product found!");
    }
    res.redirect("/products");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
