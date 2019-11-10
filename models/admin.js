const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "field name is required"]
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    canEdit: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true
  });

module.exports = mongoose.model("Admin", AdminSchema);
