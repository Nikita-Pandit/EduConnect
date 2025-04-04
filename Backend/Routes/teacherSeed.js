// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const Teacher = require("../Models/teacherModel");
// const teacherData = require("../data/teachers.json");

// const router = express.Router();

// router.post("/teacher/seed", async (req, res) => {
//   try {
//     const insertedTeachers = await Teacher.insertMany(teacherData);
//     fs.writeFileSync(
//       path.join(__dirname, "../data/teacherOutput.json"),
//       JSON.stringify(insertedTeachers, null, 2)
//     );
//     res.status(201).json({ message: "Teachers inserted!", data: insertedTeachers });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const Teacher = require("../Models/teacherModel");
const teacherData = require("../data/teachers.json");

const router = express.Router();

router.post("/teacher/seed", async (req, res) => {
  try {
    // First hash the passwords
    const hashedTeachers = await Promise.all(
      teacherData.map(async (teacher) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(teacher.password, salt);
        return { ...teacher, password: hashedPassword };
      })
    );

    // Insert into DB
    const insertedTeachers = await Teacher.insertMany(hashedTeachers);

    // Save output to JSON file
    fs.writeFileSync(
      path.join(__dirname, "../data/teacherOutput.json"),
      JSON.stringify(insertedTeachers, null, 2)
    );

    res.status(201).json({ message: "Teachers inserted!", data: insertedTeachers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
