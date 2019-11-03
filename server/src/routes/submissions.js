var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const Submission = require("../models/Submission");

router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (err) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { email, trailName, details, lat, lng } = req.body;

  const submission = new Submission({
    email: email,
    coordinates: req.body.coordinates,
    details: details,
    trailName: trailName,
    lat: lat,
    lng: lng
  });
  try {
    const savedSubmission = await submission.save();
    res.json(savedSubmission);
  } catch (error) {
    console.error({ message: error });
  }
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
