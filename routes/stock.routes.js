const express = require("express");
const multer = require("multer");
const uploader = require("../middleware/uploader");
const StockController = require("../controllers/Stock.controller");

const router = express.Router();

router.route("/bulkupdate").patch(StockController.bulkUpdateStock);

router.route("/bulkdelete").delete(StockController.bulkDeleteStock);

router.route("/bulkcreate").post(StockController.bulkCreateStock);

router
  .route("/")
  .get(StockController.getStocks)
  .post(StockController.createStock);

router
  .route("/:id")
  .get(StockController.getStockById)
  .patch(StockController.updateStockById)
  .delete(StockController.deleteStockById);

module.exports = router;
