const http = require("http");
const fs = require("fs");
const path = require('path');
const requests = require("requests");
const express = require("express");
const app = express();
console.log(path.join(__dirname, "/assets"));
//we cant use express.static() becoz static method is use to server static html and js files and we are using
var absolutePath = path.join(__dirname, "/assets");
app.use(express.static(absolutePath));
// app.use('/assets', express.static('assets'));

const readFile = fs.readFileSync("wetAppComOneFile.html", "utf-8");
const setValues = (readFile, val) => {
    let returndata = readFile.replace("{%degree%}", Math.ceil((val.main.temp) / 10));
    returndata = returndata.replace("{%country%}", val.sys.country);
    returndata = returndata.replace("{%location%}", val.name);
    returndata = returndata.replace("{%tempIconStatus%}", val.weather[0].main);
    return returndata;
}
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        //must have to write http:// else u will gut Unsupported protocol "undefined" error 
        requests(
            "http://api.openweathermap.org/data/2.5/weather?q=Islamabad&appid=7428d86cddd52bb1813e331885cc6b27"
        )
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                //converting object of js into array means (array of an object)
                const wetArray = [objdata];
                const realApiData = wetArray
                    .map((val) => setValues(readFile, val))
                    .join("");
                res.write(realApiData);
            })
            .on("end", (err) => {
                if (err) {
                    // res.end(err);
                    return console.log('connection error' + err);
                }
                res.end();
            });
    }
    else {
        res.end("File not found");
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log("listening on port 8000");
});