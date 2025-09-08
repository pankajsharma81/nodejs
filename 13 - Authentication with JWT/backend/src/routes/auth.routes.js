const express = require("express");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully",
    user,
  });
});

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid username",
    });
  }

  isPasswordValid = password == user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  res.status(200).json({
    message: "user loggedIn Successfully",
  });
});

// GET /user
router.get("/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findOne({
        id: decoded._id,
      })
      .select("-password")
      .lean();

    res.status(200).json({
      message: "user data fetched successfully",
      user,
    });
  } catch (err) {
    return res.status(401).json({
      message: "un-authorized ",
    });
  }
});

module.exports = router;
