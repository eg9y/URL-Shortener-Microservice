//get requirements
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var mongoose = require("mongoose");
var { url } = require("./models/url");
require("dotenv/config");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/url");
var app = express();

app.use(express.static(__dirname + "/public"));

// creates the database entry
// (*) accepts all argument after /new/ regardless of how it's formatted
app.get("/new/:targetURL(*)", (req, res) => {
  var { targetURL } = req.params;
  var regex = /[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  if (regex.test(targetURL) == true) {
    var short = Math.floor(Math.random() * 100000).toString();

    function findLoop() {
      url
        .findOne({ shortenURL: short })
        .then(rng => {
          if (rng) {
            short = Math.floor(Math.random() * 100000).toString();
            console.log(short);
            findLoop();
          } else {
            var data = new url({
              originalURL: targetURL,
              shortenURL: short
            });
            data.save(err => {
              if (err) {
                return res.send("Error saving to db");
              }
            });
            return res.json(data);
          }
        })
        .catch(err => {
          if (err) {
            return res.send("Error checking short");
          }
        });
    }
    findLoop();
  } else {
    return res.json({ targetURL: "fail" });
  }
});

// use shorten URL
app.get("/:shortenURL(*)", (req, res) => {
  let { shortenURL } = req.params;
  url
    .findOne({ shortenURL })
    .then(url => {
      if (!url) {
        return res.send(
          "This shorten URL doesn't correspond to any original URL"
        );
      }
      if (
        url.originalURL.slice(0, 7) == "http://" ||
        url.originalURL.slice(0, 8) == "https://"
      ) {
        return res.redirect(url.originalURL);
      }
      res.redirect("http://" + url.originalURL);
    })
    .catch(err => {
      return new Error("Can't redirect to website");
    });
});

// listen to see port
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}...`);
});
