// const fs = require("fs");

// rename file
// fs.renameSync("./text.txt","newText.txt")

// delete file
// fs.unlinkSync("./newText.txt")

// write in file
// fs.writeFileSync("./text.txt", "Pro Coderr of nodeJs, other are not...");

// read the file
// const text = fs.readFileSync("./text.txt");
// console.log(text.toString());

// const { exec } = require("child_process");

// exec("start chrome");

const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello Ji");
});

server.listen(3000);
