const Product = require("../models/product");
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
  try {
    const { title, subtitle } = req.body;
    const newProduct = new Product({
      image: req.files["image"][0].filename,
      title,
      subtitle,
      pdfFile: req.files["pdfFile"][0].filename,
    });
    const product = await newProduct.save();
    res.status(201).json({
      message: "Product added successfully",
      product,
    });
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
    const product = await Product.find({});
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

exports.editProduct = async (req, res) => {
  try {
    let { title, subtitle } = req.body;
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
      },
      { new: true }
    );
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
    res.status(200).json("Product Deleted Successfully");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
