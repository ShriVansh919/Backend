const http =require("http");
const fs =require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const filePath = path.join(__dirname, "notes1.json");

const server = http.createServer((req, res) => {
    const url =new URL(req.url,`http://${req.headers.host}`);
    const pathname = url.pathname;
    const method = req.method;


    if(method === "GET" && pathname === "/") {
      res.writeHead(200, "server responded")
      res.end()
    } else if(method == "GET" && pathname == "/notes") {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err) {
          res.writeHead(500, "cannot get data")
          res.end()
        } else {
          res.writeHead(200, {"content-type" : "application/json"});
          res.end(data);
        }
      })
    } else if(method == "POST" && pathname == "/notes") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      })

      req.on("end", () => {
        fs.readFile(filePath, "utf-8", (err, data) => {
          const notes = JSON.parse(data);
          const parsedBody = JSON.parse(body);
          notes.push(parsedBody)
          fs.writeFile(filePath, JSON.stringify(notes), ()=> {
            res.end(201, "done!")
          })
        })
      })
    }

});

server.listen(3000,() => {console.log("Server running on http://localhost:3000");
});