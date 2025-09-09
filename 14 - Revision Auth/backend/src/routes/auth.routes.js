const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userexits = await userModel.findOne({
    username,
    password,
  });

  if (userexits) {
    res.status(409).json({
      message: "user already exits",
    });
  }

  const newUser = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SCERET);

  res.cookie("token", token, {
    expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 07 days;
  });

  res.status(201).json({
    message: "User Created Successfully",
    newUser,
  });
});

router.get("/user", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SCERET);

    const user = await userModel
      .findOne({
        _id: decoded.id,
      })
      .select("-password")
      .lean();

    res.status(200).json({
      message: "get userdata",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "unauthorized access",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found!",
    });
  }

  const isValidPassword = password == user.password;

  if (!isValidPassword) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SCERET);

  res.cookie("token", token, {
    expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  res.status(200).json({
    message: "logged in successfully ",
    user,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "logged out successfully",
  });
});

module.exports = router;
