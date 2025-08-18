const http = require("http");

const server = http.createServer((req,res)=>{
    res.end("http server is working")
});

server.listen(3000, () => {
  console.log("Server is listening on part 3000");
});
