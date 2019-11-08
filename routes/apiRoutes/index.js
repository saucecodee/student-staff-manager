const router = require("express").Router();
const adminRoutes = require("./adminRoutes");
const studentRoutes = require("./studentRoutes");

module.exports = function(app) {
  router.get("/test", (req, res) => {
    res.send("yehh!");
  });
  
  router.use("/admins", adminRoutes());
  router.use("/students", studentRoutes());

  return router;
};
