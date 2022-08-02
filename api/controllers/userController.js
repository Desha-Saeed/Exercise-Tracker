const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//creating a token

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

//login user
const loginUser = async (req, res) => {
  try {
    res.json({ msg: "login user" });
  } catch (error) {
    console.log(error);
  }
};

//signup user

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
