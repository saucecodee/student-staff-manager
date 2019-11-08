const router = require("express").Router();

module.exports = function(app) {
  router.get("/test", (req, res) => {
    res.send("yehh!");
  });

  router.get("/home", (req, res) => {
    res.status(200).sendFile(path.resolve("public/index.html"));
  });

  return router;
};
