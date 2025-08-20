import express from "express";
import connectedToDB from "./src/db/db.js";

const app = express();
connectedToDB();

app.use(express.json());

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);

  res.json({
    message: "notes created successfully",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
