const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Define category routes
router.get("/", categoryController.getAllCategories);
router.get("/all-cats", categoryController.getAllCatsAndSubCats);
router.get("/catForm", categoryController.getCatForm);
router.get("/:id/edit", categoryController.getEditform);
router.get("/:id", categoryController.getCategoryById);

router.post("/", categoryController.createCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
