const User = require("./../model/User");
exports.signupService = async (userInfo) => {
  try {
    const user = await User.create(userInfo);
    return user;
  } catch (error) {
    console.error({ error });
  }
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email });
};
