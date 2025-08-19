import express from "express";

const app = express();

app.get("/home",(req,res)=>{
    res.send("Welcome to the home page")
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
