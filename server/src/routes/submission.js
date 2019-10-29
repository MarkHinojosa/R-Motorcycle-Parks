var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("submission details Get!!");
});

router.post("/", (req, res) => {
  res.send("submission details POST!!");
});

var incorrectLat = "latitude must be between -90 and 90";
var incorrectLong = "longitude must be between -180 and 180";

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  trailName: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true,
    min: [-90, incorrectLat],
    max: [90, incorrectLat]
  },
  longitude: {
    type: Number,
    required: true,
    min: [-180, incorrectLong],
    max: [180, incorrectLong]
  }
});

var Submission = db.model("Submission", schema);

// This cat has no name :(
var submission = new Submission();
submission.save(function(error) {
  assert.equal(error.errors["email"].message, "Path `email` is required.");

  error = cat.validateSync();
  assert.equal(error.errors["email"].message, "Path `email` is required.");
});

module.exports = router;
