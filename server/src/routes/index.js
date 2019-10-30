const express = require("express");
const submissionRoute = require("./submissions");
const router = express.Router();

// const exampleRoute = require("./exampleRoute");

router.get("/", (req, res) => {
  res.send("root");
});

router.use("/submission", submissionRoute);

//just an example of importing another route into index.js

// router.use("/exampleRoute", exampleRoute);

module.exports = router;
