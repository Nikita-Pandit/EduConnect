const mongoose = require("mongoose");

const supervisedStudentSchema = new mongoose.Schema({
  teacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  studentRollNo: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("SupervisedStudent", supervisedStudentSchema);
