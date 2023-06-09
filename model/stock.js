const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
/* 
        stock would be independent, it means it won't depend on other schema
*/

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please provide a name for this stock"],
      trim: true,
      // unique: [true, "Name must be unique"],
      lowercase: true,
      minlength: [3, "name must be at least 3 characters"],
      maxlength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      lowercase: true,
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
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url."],
      },
    ],
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negetive"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negetive"],
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
    status: {
      type: String,
      required: true,
      enum: ["in-stock", "out-of-stock", "discontinued"],
    },
    store: {
      name: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Please provide a store name."],
        enum: {
          values: [
            "dhaka",
            "comilla",
            "rajshahi",
            "khulna",
            "borishal",
            "rangpur",
            "mymensing",
            "dinajpur",
          ],
          message: "{VALUE} is not a valid store name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        require: [true, "Please provide a supplier name."],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware to saving data: pre/post

stockSchema.pre("save", function (next) {
  // this ->
  console.log("before saving data");

  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
