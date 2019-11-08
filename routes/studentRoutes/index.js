const router = require("express").Router();
const path = require('path');

module.exports = function() {

  router.get("/all-students", (req, res) => {
    res.status(200).sendFile(path.resolve("public/student/students.html"));
  });

  router.get("/login", (req, res) => {
    res.status(200).sendFile(path.resolve("public/student/login.html"));
  });

  return router;
};
