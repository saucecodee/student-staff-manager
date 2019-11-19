const Admin = require("../models/admin").admin2;
const CustomError = require("../helpers/CustomError");

async function canEdit(req, res, next) {
  console.log(req.headers.token)
  const admin = await Admin.findOne({ _id: req.headers.token });
 console.log(admin, "fjfjb===============")
  if (!admin) throw new CustomError("Admin dosen't exist");

  if (admin.canEdit == "true") {
    next();
  } else {
    throw new CustomError("Unauthorized user", 401);
  }
}

module.exports.canEdit = canEdit;
