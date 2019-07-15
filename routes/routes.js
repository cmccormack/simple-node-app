const router = require("express").Router();

module.exports = () => {
  router.use((err, req, res, next) => {
    res.json({
      success: false,
      error: err.message || err.msg || err,
    });
  });

  return router;
};
