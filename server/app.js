const express = require("express");
const app = express();
const routes = require("./src/routes");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Middleware, bodyparser needs to be first!!!
app.use(bodyParser.json());
app.use("/api", routes);

//Setup config
let port, url;
dotenv.config();

if (process.env.PORT) {
  console.log("Configured PORT from ENV file");
  port = process.env.PORT;
} else {
  console.log("***No ENV File found with PORT Configuration***");
  port = 3000;
}

process.env.URL
  ? (url = process.env.URL)
  : console.log("URL not found, missing env?");

//Connect To DB
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
  console.log("Connected to database")
);

app.listen(port, () =>
  console.log(`Server online and listening on port ${port}`)
);
