const router = require("express").Router();
const {
  createAdmin,
  signinAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
  editAdmin,
} = require("../../controllers/adminController");

module.exports = function () {
  router.post("/", createAdmin);
  router.post("/signin", signinAdmin);
  router.get("/", getAdmins);
  router.get("/:adminId", getAdmin);
  router.put("/:adminId", editAdmin);
  router.delete("/:adminId", deleteAdmin);

  return router;
};
