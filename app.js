const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`Database connection is successfull`);
});

/* routes */
const prodcutRoute = require("./routes/product.routes");
const brandRoute = require("./routes/brand.route");
const categoryRoute = require("./routes/category.routes");
const storeRoute = require("./routes/store.routes");
const supplierRoute = require("./routes/supplier.routes");
const stockRoute = require("./routes/stock.routes");
const userRoute = require("./routes/user.routes");

app.get("/", (req, res) => {
  res.send("Route is working! yay!");
});

// post route to db
app.use("/api/v1/product", prodcutRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = app;
