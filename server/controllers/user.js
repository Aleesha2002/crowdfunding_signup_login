const User = require("../models/User");
const bcrypt = require("bcrypt");

//GET USER
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, password } = req.body;
    if (userId === id) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
      }
      try {
        const update = await User.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(update);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can not update user details");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
