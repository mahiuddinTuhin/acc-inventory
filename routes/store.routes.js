const express = require("express");
const router = express.Router();
const storeController = require("./../controllers/store.controller");

router
  .route("/")
  .post(storeController.saveStoreController)
  .get(storeController.getStoreController);

router
  .route("/:id")
  .patch(storeController.updateStoreController)
  .delete(storeController.deleteStoreController);

module.exports = router;
