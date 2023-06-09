const express = require("express");
const multer = require("multer");
const uploader = require("../middleware/uploader");
const productController = require("./../controllers/product.controller");

const router = express.Router();

router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);

router.route("/bulkupdate").patch(productController.bulkUpdateProduct);

router.route("/bulkdelete").delete(productController.bulkDeleteProduct);

router.route("/bulkcreate").post(productController.bulkCreateProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
