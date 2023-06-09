const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const StoreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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
        message: "{VALUE} is not a valid name",
      },
      lowercase: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
