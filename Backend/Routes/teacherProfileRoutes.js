const { createTeacherProfileInfo, getTeacherProfileInfo, getTeacherProfileImage ,getTeacherInfo,rankTeacher,showPiChart,
    showStudentCheckbox
} = require('../Controllers/teacherProfileController');
const express = require("express");
const multer = require("multer");
const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // Directory for storing uploaded files
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
    }
});

// Multer middleware for handling file uploads
const upload = multer({ storage: storage });

// Routes
router.post("/teacherProfile/:teacherId", createTeacherProfileInfo); // Create teacher profile
router.get("/teacherProfile/:teacherId", getTeacherProfileInfo); // Get teacher profile
router.post("/teacherProfile/:teacherId/uploadImage", upload.single('image'), getTeacherProfileImage); // Upload image and call the controller
router.get("/teacher/:teacherId",getTeacherInfo)
router.post("/teacherRank",rankTeacher)
router.get("/teacher/rankStatistics/:teacherID",showPiChart)
 router.post("/teacher/studentCheckbox",showStudentCheckbox)
module.exports = router;
