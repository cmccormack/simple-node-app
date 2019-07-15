const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.set("port", process.env.PORT || 3000);

// Use pug with template engine
app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "templates"));

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

require("./routes")(app);

const server = app.listen(app.get("port"), err => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
    process.exit();
  }

  console.log(`💻  server started on port ${server.address().port}!`);
});
