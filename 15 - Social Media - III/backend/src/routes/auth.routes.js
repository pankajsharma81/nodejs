const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userExits = await userModel.findOne({
    username,
    password,
  });

  if (userExits) {
    res.status(409).json({
      message: "user already exits",
    });
  }

  const newUser = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
    newUser,
  });
});

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isValidPassword = user.password == password;

  if (!isValidPassword) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie(token, "token");

  res.status(200).json({
    message: "logged in successfully",
    user,
  });
});

// GET /user
router.get("/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findOne({
        _id: decoded.id,
      })
      .select("-password")
      .lean();

    res.status(200).json({
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    console.log("error in user route", err);
  }

  const user = await userModel.findOne();
});

module.exports = router;
