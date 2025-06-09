const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const bcrypt = require("bcryptjs");

env.config();

const register = async (req, res, next) => {
  try {
    await userModel.create(req.body);

    res.send({
      success: true,
      message: "You are registered successfully",
    });
  } catch (error) {
    res.status(409).send({
      success: false,
      message: "User with this email already exists",
    });

    console.log(error);
  }
};

const login = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Incorrect username or password",
    });
  }

  // Check whether password is valid or not
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

  if(isPasswordValid)
  {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '5h' } // Token valid for 5 hour
    );

    res.send({
      success: true,
      message: "Logged in successfully",
      token: token
    });


  }

};

const logout = (req, res, next) => {
  res.send({
    success: true,
    message: "this is logout api",
  });
};

module.exports = { register, login, logout };
