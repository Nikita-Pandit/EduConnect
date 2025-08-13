

const express = require("express");
const app = express()
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
const env = dotenv.config();

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(process.env.database_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });


const cors = require("cors");
app.use(cors());

const signupRoutes = require("./Routes/signupRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const StudentsRoutes = require("./Routes/StudentsRoutes");
const SupervisorsRoutes = require("./Routes/SupervisorsRoutes");
const forgetPasswordRoutes = require("./Routes/forgetPasswordRoutes");
const resetPasswordRoutes = require("./Routes/resetPasswordRoutes");
const teacherProfileRoutes = require("./Routes/teacherProfileRoutes");
const searchTeachersRoutes = require("./Routes/searchTeachersRoutes");
const verifyEmailRoutes = require("./Routes/verifyEmailRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const teacherMoreInfo = require("./Models/teacherMoreInfo");
const path = require("path");
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/resumeUploads",
  express.static(path.join(__dirname, "resumeUploads"))
);

app.use(
  "/images",
  express.static(path.join(__dirname, "../Frontend/public/images"))
);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const jwt = require("jsonwebtoken");
const studentMoreInfo = require("./Models/studentMoreInfo");


app.use("/api", signupRoutes);
app.use("/api", loginRoutes);
app.use("/api", profileRoutes);
app.use("/api", StudentsRoutes);
app.use("/api", SupervisorsRoutes);
app.use("/api", forgetPasswordRoutes);
app.use("/api", resetPasswordRoutes);
app.use("/api", teacherProfileRoutes);
app.use("/api", searchTeachersRoutes);
app.use("/api", verifyEmailRoutes);
app.use("/api", chatRoutes);

// Add this endpoint to your existing server.js file
app.post("/api/studentCheckbox", async (req, res) => {
  const { teacherID, rollNo } = req.body;


  try {
    // Find student and update selectStudent field
    const student = await studentMoreInfo.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Ensure selectStudent exists and is a Map
    student.selectStudent = student.selectStudent || new Map();
    
    // Check if student is already selected by another teacher
    if (student.selectStudent.size > 0 && !student.selectStudent.has(teacherID)) {
      return res.status(400).json({
        message: "This student has already been selected by another teacher!",
      });
    }

    student.selectStudent.set(teacherID, true); // Add teacher as key with value true
    await student.save();

    res.status(200).json({
      message: "Student selected successfully",
      student,
    });
  } catch (error) {
    console.error("Error selecting students:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Keep all your existing endpoints

app.get("/api/supervisedstudents/:teacherID", async (req, res) => {
  const { teacherID } = req.params;
  try {
    // Find all students where selectStudent[teacherID] is true
    const students = await studentMoreInfo.find(
      {
        [`selectStudent.${teacherID}`]: true, // Query where teacherID exists and is true
      },
      "name rollNo domain branch image"
    ); // Only fetch name & rollNumber
    if (students.length > 0) {
      res.json({ students });
    } else {
      res.status(404).json({ message: "No students under supervision" });
    }
  } catch (error) {
    console.error("Error fetching supervised students:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});
//checkbox
app.post("/api/teacher/removeStudent", async (req, res) => {
  const { teacherID, rollNo } = req.body;

  try {
    // Validate input
    if (!teacherID || !rollNo) {
      return res
        .status(400)
        .json({ message: "Teacher ID and Roll Number are required" });
    }

    // Check if teacher exists
    const teacher = await teacherMoreInfo.findOne({ teacherID });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Check if student exists
    const student = await studentMoreInfo.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Remove teacher from student's selectStudent map
    if (student.selectStudent && student.selectStudent.has(teacherID)) {
      student.selectStudent.delete(teacherID);
      await student.save();
    }

    res.json({
      message: "Student removed successfully",
      student,
    });
  } catch (error) {
    console.error("Error removing student:", error);
    res.status(500).json({ message: "Error removing student" });
  }
});


//4th year
app.get("/api/student/unique/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    // Validate input
    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Find the student in studentMoreInfo collection
    const student = await studentMoreInfo.findOne({ studentID: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the student's year (selectYear) along with other basic info
    res.json({
      name: student.name,
      roll: student.rollNo,
      selectYear: student.selectYear,
      // You can include other fields if needed
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Error fetching student details" });
  }
});


// Get teacher rankings for a specific student
app.get("/api/teacherRanks/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Find all teachers who have prioritized this student
    const teachers = await teacherMoreInfo.find({
      [`rank.${studentId}`]: { $exists: true }
    });

    const rankedTeachers = teachers.map(teacher => ({
      name: teacher.name,
      rank: teacher.rank.get(studentId)
    }));

    res.json(rankedTeachers);
  } catch (error) {
    console.error("Error fetching teacher rankings:", error);
    res.status(500).json({ message: "Error fetching teacher rankings" });
  }
});

// Get teachers who have selected this student
app.get("/api/selectedTeachers/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Find the student
    const student = await studentMoreInfo.findOne({ studentID: studentId });
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Get teacher IDs who have selected this student
    const teacherIds = Array.from(student.selectStudent?.keys() || []);
    
    // Get teacher names
    const teachers = await teacherMoreInfo.find({
      teacherID: { $in: teacherIds }
    }, "name teacherID");

    res.json(teachers);
  } catch (error) {
    console.error("Error fetching selected teachers:", error);
    res.status(500).json({ message: "Error fetching selected teachers" });
  }
});



app.get("/", (req,res)=>{
  res.send("EduConnect API – Connecting learners and educators!")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
