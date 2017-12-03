var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var urlSchema = new Schema(
  {
    originalURL: {
      type: String
    },
    shortenURL: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const url = mongoose.model("url", urlSchema);

module.exports = {
  url
};
