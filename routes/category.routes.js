const express = require("express");
const categoryController = require("./../controllers/category.controller");
const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategory)
  .post(categoryController.saveCategory);

router
  .route("/:id")
  .delete(categoryController.deleteCategoryById)
  .patch(categoryController.updateCategoryById);

module.exports = router;
