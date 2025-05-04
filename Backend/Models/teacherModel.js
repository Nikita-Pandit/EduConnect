const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: Number, required: true },
  email: { type: String, required: true },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  // verificationToken: {
  //   type: String,
  // },
  // verificationTokenExpiry: { type: Date },
  // resetPasswordToken: { type: String }, // Optional
  // resetPasswordExpires: { type: Date }, // Optional
});
// Hash password before saving it to the database
teacherSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// const teacherModel = mongoose.model("teacher", teacherSchema);
const teacherModel = mongoose.models.teacher || mongoose.model("teacher", teacherSchema);

module.exports = teacherModel;
