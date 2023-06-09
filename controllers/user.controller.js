const {
  signupService,
  findUserByEmailService,
} = require("../services/user.service");
const bcrypt = require("bcrypt");
const { generatedToken } = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully signed up.",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        error: "Please provide your credentials.",
      });
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(401).json({
        status: "failed",
        error: "No user found, please create an account.",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "failed",
        error: "Email or password are not valid.",
      });
    }
    if (user.status !== "active" && user.status !== "blocked") {
      return res.status(401).json({
        status: "failed",
        error: "Account is not active yet.",
      });
    }

    if (user.status === "blocked") {
      return res.status(401).json({
        status: "failed",
        error: "Account is temporary blocked.",
      });
    }

    const token = generatedToken(user);

    const { password: pwd, ...newUserInfo } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in.",
      data: {
        user: newUserInfo,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

exports.getme = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {}
};
