var bodyParser = require("body-parser");
var cors = require("cors");

var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.Promise = global.Promise; //setup to use promises
mongoose.connect("mongodb://localhost:27017/URL");

var URL = mongoose.model("URL", {
  url: {
    type: String
  },
  shortenURL: {
    type: String
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (res, req) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/:shortenURL", (res, req) => {});

app.get("/new/:URL", (res, req) => {});

var newURL = new URL({
  url: "Google.com",
  shortenURL: "565rd"
});

newURL.save().then(todo => {}, e => {});
