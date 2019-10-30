var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const Submission = require("../models/Submission");

router.get("/", (req, res) => {
  console.log(req.body);
  res.send("submission details Get!!");
});

router.post("/", (req, res) => {
  console.log(req.body.coordinates);
  const { email, trailName, details } = req.body;

  const submission = new Submission({
    email: email,
    coordinates: req.body.coordinates,
    details: details,
    trailName: trailName
  });
  submission
    .save()
    .then(response => res.json(response))
    .catch(err => res.send({ message: err }));
});

// var Submission = db.model("Submission", schema);

// This cat has no name :(
// var submission = new Submission();
// submission.save(function(error) {
//   assert.equal(error.errors["email"].message, "Path `email` is required.");

//   error = cat.validateSync();
//   assert.equal(error.errors["email"].message, "Path `email` is required.");
// });

module.exports = router;
