import express from "express";
import dotenv from "dotenv";    

import connectedToDB from "./src/db/db.js";

dotenv.config();  

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
