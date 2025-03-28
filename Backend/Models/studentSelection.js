const mongoose = require("mongoose");

const StudentSelectionSchema = new mongoose.Schema({
  teacherID: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  rollNo: { type: String, required: true },
  checked: { type: Boolean, default: false }
});

module.exports = mongoose.model("StudentSelection", StudentSelectionSchema);