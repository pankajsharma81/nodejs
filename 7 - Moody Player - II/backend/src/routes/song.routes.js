const express = require("express");
const songModel = require("../models/song.model");
const multer = require("multer");
const uploadFile = require("../service/storage.service");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {

  console.log(req.body);
  console.log(req.file);

  const fileData = await uploadFile(req.file);
  console.log(fileData);
  
  res.json({
    message: "song added successfully",
    song: req.body,
  });
});

module.exports = router;
