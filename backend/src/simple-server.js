"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require("https");
var fs = require("fs");
var PORT = process.env.PORT || 5000;
var options = {
    key: fs.readFileSync('certs/private-key.pem'),
    cert: fs.readFileSync('certs/certificate.pem')
};
https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end('Hello, secure world!');
}).listen(PORT, function () {
    console.log("Simple server is running on https://localhost:".concat(PORT));
});
