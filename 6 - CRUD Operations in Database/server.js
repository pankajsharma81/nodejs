const express = require("express");
require("dotenv").config();

const connectToDB = require("./src/db/db");
const noteModel = require("./src/models/note.model");

const app = express();
connectToDB();

app.use(express.json());

// create
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);

  await noteModel.create({
    title,
    content,
  });

  res.json({
    message: "note created successfully",
  });
});

// read
app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.json({
    message: "notes fetched successfully",
    notes,
  });
});

// delete
app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  // await noteModel.findByIdAndDelete(noteId); -> by my own

  await noteModel.findOneAndDelete({
    _id: noteId,
  });

  res.json({
    message: "note deleted successfully",
  });
});

// update
app.patch("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  await noteModel.findOneAndUpdate(
    {
      _id: noteId,
    },
    {
      title: title,
      content: content,
    }
  );

  res.json({
    message: "note updated successfully",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
