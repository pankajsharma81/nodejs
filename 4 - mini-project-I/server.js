import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("notes application");
});

const notes = [];

// POST /notes => { title, content }
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.json({
    message: "Notes created Successfully",
  });
});

// GET /notes
app.get("/notes", (req, res) => {
  res.json({
    notes: notes,
  });
});

// DELETE /notes/:idx
app.delete("/notes/:idx", (req, res) => {
  const idx = req.params.idx;

  delete notes[idx];

  res.json({
    message: "note deleted successfully",
  });
});

// PATCH /notes/:idx
app.patch("/notes/:idx", (req, res) => {
  const idx = req.params.idx;

  const { title, content } = req.body;

  notes[idx].title = title;
  notes[idx].content = content;

  res.json({
    message: "note updated successfully",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
