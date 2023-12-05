const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

router.get("/", subcategoryController.getAllSubcategories);
router.get("/:id", subcategoryController.getSubcategoryById);
router.get("/:id/edit", subcategoryController.getEditform);
router.post("/", subcategoryController.createSubcategory);
router.patch("/:id", subcategoryController.updateSubcategory);
router.delete("/:id", subcategoryController.deleteSubcategory);

module.exports = router;
