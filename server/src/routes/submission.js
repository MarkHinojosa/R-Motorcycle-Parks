var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("submission details Get!!");
});

router.post("/", (req, res) => {
  res.send("submission details POST!!");
});

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
