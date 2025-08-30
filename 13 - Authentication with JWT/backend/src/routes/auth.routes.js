const express = require("express");
const userModel = require("../model/user.model");

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username,
    password,
  });

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

module.exports = router;
