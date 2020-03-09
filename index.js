const express = require("express");
const fs = require("fs")

const app = express();


var rh = fs.readFileSync(__dirname+"/config.production.json", "utf-8");

var prod = JSON.parse(rh);
prod.server.port = process.env.PORT || 4000;
if (process.env.PORT) {
    prod.url = "http://localhost:"+process.env.PORT;
    prod.server.host = "127.0.0.1" 
} else {
    prod.url = "http://localhost:4000";
    prod.server.host =  "localhost";
}
prod.database.connection.filename = __dirname+"/ghost.db";
prod.paths.contentPath = __dirname+"/content";

fs.writeFileSync(__dirname+"/config.production.json", JSON.stringify(prod, 0, 2));
fs.writeFileSync(__dirname+"/config.development.json", JSON.stringify(prod, 0, 2));

console.log("content path ", __dirname)
console.log(fs.readdirSync(__dirname))
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")





app.get("/", (req, res) => {
    res.send(fs.readFileSync(__dirname+"/config.production.json", "utf-8"))
})
//app.listen(process.env.PORT)


var ghost = require('ghost');
ghost().then((ghostServer) => {
    console.log("ghost running", prod.server)
    //console.log(Object.keys( ghostServer.config) )
    //app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start();


});


//app.get("/", (req, res) => {
//    res.send("Online "+ Date.now() )
//})

//app.listen(process.env.PORT ||  4000, () => {
 //   console.log("listening on ", (process.env.HOST||"http://localhost")+":"+(process.env.PORT||4000))
//})

