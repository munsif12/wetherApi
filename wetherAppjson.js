const http = require("http");
const fs = require("fs");
const requests = require("requests");
const readFile = fs.readFileSync("wetherApp.html", "utf-8");
const setValues = (readFile, apiDataVal) => {
    console.log(apiDataVal.name);
    // let returndata = readFile.replace("{%degreeVal%}", apiDataVal.main.temp);
    // returndata = readFile.replace("{%country%}", apiDataVal.sys.country);
    let returndata = readFile.replace("{%location%}", apiDataVal.name);
    //console.log(apiDataVal.main);
    return returndata;
}
// console.log(readFile);
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        //must have to write http:// else u will gut Unsupported protocol "undefined" error 
        requests("http://api.openweathermap.org/data/2.5/weather?q=Islamabad&appid=4331b45d1fe637fef6296514745974f8")
            .on("data", (chunk) => {
                const convertingChunkIntoJsData = JSON.parse(chunk);
                //converting object of js into array means (array of an object)
                const wetArray = [convertingChunkIntoJsData];
                res.write("this is home page");
                const realApiData = wetArray.map(val => {
                    setValues(readFile, val);
                });



                console.log(typeof (realApiData));
                console.log(setValues());
                console.log(realApiData);
                res.write(realApiData);
                console.log(wetArray[0].main.temp);
            })
            .on("end", (err) => {
                if (err) {
                    return console.log('connection error' + err);
                }
                res.end();
            });
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log("listening on port 8000");
});