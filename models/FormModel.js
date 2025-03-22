const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    message: { type: String },
    isDeleted: { type: Boolean, default: false }, // Soft delete flag
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
