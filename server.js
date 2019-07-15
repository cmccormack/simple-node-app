const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.set("port", process.env.PORT || 3000);

// Use pug with template engine
// app.set("view engine", "pug");
// app.set("views", path.resolve(__dirname, "templates"));

// Body parsing - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Body parsing - parse json
app.use(bodyParser.json());

// Middleware to log the URL for each request
app.use(function(req, res, next) {
  console.log(req.originalUrl);
  next();
});

// Use static server to handle static assets
app.use(express.static(path.resolve(__dirname, "public")));

app.post("/tm", (req, res, next) => {
  // Validate primer is not empty string
  if (!req.body["primer-input"]) {
    res.send("Error: must include primer");
  }

  const primerValues = {
    A: 2,
    T: 2,
    C: 4,
    G: 4,
  };

  const { "primer-input": primer } = req.body;

  const result = primer
    .toUpperCase()
    .split("")
    .reduce((acc, base) => primerValues[base] + acc, 0);

  res.type("json");
  res.send({
    success: true,
    result,
  });

  // Render the pug template with appropriate data
  // res.render("results", { result });
});

app.use((err, req, res, next) => {
  res.json({
    success: false,
    error: err.message || err.msg || err,
  });
});

const server = app.listen(app.get("port"), err => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
    process.exit();
  }

  console.log(`💻  server started on port ${server.address().port}!`);
});
