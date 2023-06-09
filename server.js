const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = express();
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`Database connection is successfull`.red.bold);
});

// port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
