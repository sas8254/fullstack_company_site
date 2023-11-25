const express = require("express");
const productController = require("../controllers/productController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "./uploads/images"); // Save images in the "uploads/images" directory
    } else if (file.fieldname === "pdfFile") {
      cb(null, "./uploads/pdfs"); // Save PDFs in the "uploads/pdfs" directory
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.admin) {
    return next();
  }
  res.redirect("/auth/login");
}

router.post(
  "/",
  upload.fields([{ name: "image" }, { name: "pdfFile" }]),
  productController.addProduct
);

router.get("/add", isAuthenticated, productController.getAddForm);

router.get("/:id/edit", isAuthenticated, productController.getEditForm);

router.get("/", productController.getAllProducts);

router.get("/:Id", productController.getProduct);

router.patch(
  "/:Id",
  isAuthenticated,
  upload.fields([{ name: "image" }, { name: "pdfFile" }]),
  productController.editProduct
);

router.delete("/:Id", isAuthenticated, productController.deleteProduct);

router.get("/subcat/:Id", productController.getAllProductsOfSubcategory);

module.exports = router;
