//get requirements
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var mongoose = require("mongoose");
require("dotenv/config");

var app = express();

app.use(express.static(__dirname + "/public"));

// creates the database entry
// (*) accepts all argument after /new/ regardless of how it's formatted
app.get("/new/:targetUrl(*)", (req, res) => {
  var { targetUrl } = req.params;
  res.json({ targetUrl });
});

// listen to see port
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}...`);
});
