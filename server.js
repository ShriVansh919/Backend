const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.method === "POST" && req.url === "/save") {

        let body = "";

        // receive data chunks
        req.on("data", chunk => {
            body += chunk.toString();
        });

        // when all data is received
        req.on("end", () => {

            fs.appendFile("file.txt", body + "\n", (err) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end("Error saving data");
                }

                res.end("Data saved successfully");
            });

        });

    } else {
        res.end("Server Running");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
