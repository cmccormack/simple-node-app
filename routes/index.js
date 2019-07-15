module.exports = app => {
  // Setup Additional Routers
  const calcRouter = require("./calc")();

  // Use Routers
  app.use("/calc", calcRouter);

  app.use((err, req, res, next) => {
    console.error(err);
    res.json({
      success: false,
      message: err.message || err.msg || err,
    });
  });
};
