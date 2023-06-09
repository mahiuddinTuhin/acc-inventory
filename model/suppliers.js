const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      lowercase: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name is too large"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid email."],
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    contactNumber: {
      type: String,
      required: [true, "Please provide a contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number.",
      },
    },

    emergencyContactNumber: {
      type: String,
      required: [true, "Please provide an emergency contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number.",
      },
    },
    tradeLicenceNumber: {
      type: Number,
      required: [true, "Please provide your trade licence number."],
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide your present address."],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide your permanent address."],
    },
    location: {
      type: String,
      trim: true,
      required: [true, "Please provide a location."],
      enum: {
        values: [
          "Dhaka",
          "Comilla",
          "Rajshahi",
          "Khulna",
          "Borishal",
          "Rangpur",
          "Mymensing",
          "Dinajpur",
        ],
        message: "{VALUE} is not a valid name",
        lowercase: true,
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL."],
    },
    nationalIdImageURL: {
      type: String,
      required: true,
      validate: [validator.isURL, "Please provide a valid URL."],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "discontinue"],
    },
  },
  {
    timestamps: true,
  }
);

const Suppliers = mongoose.model("Suppliers", supplierSchema);

module.exports = Suppliers;
