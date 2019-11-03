const mongoose = require("mongoose");

const incorrectLat = "latitude must be between -90 and 90";
const incorrectLong = "longitude must be between -180 and 180";

const submissionSchema = new mongoose.Schema({
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
  coordinates: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  lat: { type: Number },
  lng: { type: Number }
});

module.exports = mongoose.model("Parks", submissionSchema);
