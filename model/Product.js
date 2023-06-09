const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
/* 
        Product would be independent, it means it won't depend on other schema
*/

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: [
          "kg",
          "litre",
          "pcs",
          "bag",
          "piece",
          "bottle",
          "pack",
          "packet",
          "box",
        ],
        message: "Unit value can't be {Value}, must be kg/litre/pcs/bag",
      },
      lowercase: true,
    },
    imageURLs: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => {
          return value.every((url) => validator.isURL(url));
        },
        message: "Please provide valid image URLs",
      },
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
        lowercase: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware to saving data: pre/post

productSchema.pre("save", function (next) {
  // this ->
  console.log("before saving data");

  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
