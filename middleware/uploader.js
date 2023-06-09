const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImageType = /png|jpg/;
    const extension = path.extname(file.originalname);
    if (supportedImageType.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png or jpg image."));
    }
  },

  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;
