const router = require("express").Router();

module.exports = () => {
  router.post("/tm", (req, res, next) => {
    // Validate primer is not empty string
    const { "primer-input": primer } = req.body;
    if (!primer) {
      return next(new Error("Error: must include primer"));
    }

    const primerValues = {
      A: 2,
      T: 2,
      C: 4,
      G: 4,
    };

    const result = primer
      .toUpperCase()
      .split("")
      .reduce((acc, base) => primerValues[base] + acc, 0);

    res.json({ success: true, message: result });

    // Render the pug template with appropriate data
    // res.render("results", { result });
  });

  return router;
};
