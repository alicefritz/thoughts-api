const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "thoughts-api" });
});

require("./app/routes/thought.routes.js")(app);
require("./app/routes/comment.routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});