const jwt = require("jsonwebtoken");

exports.generatedToken = (userInfo) => {
  const payload = {
    email: userInfo.email,
    role: userInfo.role,
  };
  // crypto.randomBytes(64).toString("hex");
  const secret = process.env.SECRET_TOKEN;
  const token = jwt.sign(payload, secret, {
    expiresIn: "20s",
  });

  return token;
};
