const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//REGISTER
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email);
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json("User does not exist");
    }

    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(400).json("Invalid user");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json(err);
  }
};
