const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email."],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required."],
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password."],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password didn't match.",
      },
    },
    role: {
      type: String,
      enum: ["buyer", "store-manager", "admin"],
      default: "buyer",
    },
    firstName: {
      type: String,
      require: [true, "Please provide first name."],
      trim: true,
      minLength: [3, "name must be at least 3 character."],
      maxLength: [100, "name is too large."],
    },
    lastName: {
      type: String,
      require: [true, "Please provide last name."],
      trim: true,
      minLength: [3, "name must be at least 3 character."],
      maxLength: [100, "name is too large."],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "please provide a valid contact number.",
      ],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url."],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const saltRounds = 10;
  const password = this.password;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    // const hashedPassword = bcrypt.hashSync(password);

    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
