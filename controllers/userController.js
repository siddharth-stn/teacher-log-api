const User = require("../models/user");

exports.user_list = async (req, res, next) => {
  if (req.user.isAdmin === true) {
    try {
      const users = await User.find({ isAdmin: false });
      if (users.length === 0) {
        res.json("No teacher in the database");
      } else {
        res.send(users);
      }
    } catch (error) {
      return next(error);
    }
  }
};
