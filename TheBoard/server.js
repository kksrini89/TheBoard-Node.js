var http = require("http");
var express = require("express");
var app = express();

var controllers = require("./controllers");

//var ejsEngine = require("ejs-locals");

//setup the view engine
//app.set("view engine", "jade");

//app.engine("ejs", ejsEngine);
//app.set("view engine", "ejs");

app.set("view engine", "vash");

controllers.init(app);

//app.get('/', function (req, res) {
//    res.send("<html><head></head><body><h1>Express App</h1></body></html>")
//});

//app.get('/api/users', function (req, res) {
//    res.set("Content-Type", "application/json");
//    res.send({ name: "Srinivasan", isActive: true });
//});

http.createServer(app).listen(3000);