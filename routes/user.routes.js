const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const userController = require("./../controllers/user.controller");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/getme", verifyToken, userController.getme);

module.exports = router;
