const express = require("express");
const fs = require("fs");
const path = require("path");
const TeacherMoreInfo = require("../Models/teacherMoreInfo");
const teacherMoreInfoData = require("../data/teacherMoreInfo.json");

const router = express.Router();

router.post("/teacher/moreinfo/seed", async (req, res) => {
  try {
    const insertedInfo = await TeacherMoreInfo.insertMany(teacherMoreInfoData);
    
    fs.writeFileSync(
      path.join(__dirname, "../data/teacherMoreInfoOutput.json"),
      JSON.stringify(insertedInfo, null, 2)
    );

    res.status(201).json({ message: "Teacher More Info Inserted!", data: insertedInfo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
