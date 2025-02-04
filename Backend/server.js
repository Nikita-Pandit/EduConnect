const express = require("express");
const app = express();

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const env = dotenv.config();

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

const studentModel = require("./Models/studentmodel");
const teacherModel = require("./Models/teacherModel");
const teacherMoreInfo = require("./Models/teacherMoreInfo");
const signupRoutes = require("./Routes/signupRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const projectsRoutes = require("./Routes/projectsRoutes");
const ResearchDoubtsRoutes = require("./Routes/researchDoubtsRoutes");
const forgetPasswordRoutes = require("./Routes/forgetPasswordRoutes");
const resetPasswordRoutes = require("./Routes/resetPasswordRoutes");
const teacherProfileRoutes = require("./Routes/teacherProfileRoutes");
const searchTeachersRoutes = require("./Routes/searchTeachersRoutes");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/images",
  express.static(path.join(__dirname, "../Frontend/public/images"))
);
// app.use('/images', express.static(path.join(__dirname, "../../Frontend/public/images")));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const jwt = require("jsonwebtoken");
const studentMoreInfo = require("./Models/studentMoreInfo");

// Connect to MongoDB
mongoose
  .connect(process.env.database_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use("/api", signupRoutes);
app.use("/api", loginRoutes);
app.use("/api", profileRoutes);
app.use("/api", projectsRoutes);
app.use("/api", ResearchDoubtsRoutes);
app.use("/api", forgetPasswordRoutes);
app.use("/api", resetPasswordRoutes);
app.use("/api", teacherProfileRoutes);
app.use('/api',searchTeachersRoutes)

app.get("/verify", async (req, res) => {
  const { token } = req.query;
  const { role } = req.query;
  try {
    console.log("Verify Route2");
    let userIDMatchWithToken;
    let user;
    if (role == "student") {
      userIDMatchWithToken = await studentModel.findOne({
        verificationToken: token,
      });
      user = await studentModel.findOneAndUpdate(
        { verificationToken: token },
        { isVerified: true, verificationToken: null },
        { new: true }
      );
    } else {
      userIDMatchWithToken = await teacherModel.findOne({
        verificationToken: token,
      });
      user = await teacherModel.findOneAndUpdate(
        { verificationToken: token },
        { isVerified: true, verificationToken: null },
        { new: true }
      );
    }
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    return res.redirect(
      `http://localhost:5173/SignUp?id=${userIDMatchWithToken._id}&role=${role}`
    );
  } catch (error) {
    console.error("Error during verification:", error);
    res.status(400).json({ error: "Verification failed" });
  }
});

app.get("/api/student/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await studentModel.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log(student);
    res.status(200).json({
      name: student.name,
      email: student.email,
      contact: student.contact,
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Error fetching student" });
  }
});

//teacher
app.get("/api/teacher/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  console.log(teacherId);
  try {
    const teacher = await teacherModel.findById(teacherId);
    console.log("Inside api/teacher/:id", teacher);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    console.log(teacher);
    res.status(200).json({
      name: teacher.name,
      email: teacher.email,
      contact: teacher.contact,
    });
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json({ error: "Error fetching teacher" });
  }
});

app.post("/api/teacherRank", async (req, res) => {
  const { studentId, teacherRank, viewTeacherId } = req.body;
  console.log("studentId", studentId);
  console.log("teacherRank", teacherRank);
  console.log("viewTeacherId", viewTeacherId);
  console.log("inside api teacherRank");

  try {
    console.log("inside try");

    // Check if the student has already given the same rank to another teacher
    const existingTeacher = await teacherMoreInfo.findOne({
      [`rank.${studentId}`]: teacherRank, // Check if this student gave the same rank
      teacherID: { $ne: viewTeacherId }, // Ensure it's a different teacher
    });

    if (existingTeacher) {
      return res.status(400).json({
        message: "You have already given this rank to another teacher!",
      });
    }

    // Find the teacher document
    const teacher = await teacherMoreInfo.findOne({ teacherID: viewTeacherId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Update the rank map
    teacher.rank.set(studentId, teacherRank);
    await teacher.save(); // Save the document

    console.log("Updated teacher:", teacher);
    res.status(200).json({
      message: "Rank updated successfully",
      teacher,
    });
  } catch (error) {
    console.error("Error updating rank:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

//teacher dashboard

// Endpoint to fetch rank data for a teacher
app.get("/api/teacher/rankStatistics/:teacherID", async (req, res) => {
  const { teacherID } = req.params;

  try {
    // Fetch teacher data by ID
    const teacher = await teacherMoreInfo.findOne({ teacherID });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Prepare data for pie chart
    const rankMap = teacher.rank;
    const rankCounts = Array(10).fill(0); // Array to count ranks 1–10
    const rankDetails = {}; // Object to store student IDs for each rank

    // Calculate rank distribution and details
    rankMap.forEach((rank, studentID) => {
      if (rank >= 1 && rank <= 10) {
        rankCounts[rank - 1] += 1; // Increment count for the rank
        if (!rankDetails[rank]) {
          rankDetails[rank] = [];
        }
        rankDetails[rank].push(studentID); // Store student IDs for the rank
      }
    });

    // Calculate percentages
    const totalRanks = Array.from(rankMap.values()).length;
    const rankPercentages = rankCounts.map((count) =>
      totalRanks > 0 ? (count / totalRanks) * 100 : 0
    );

    // Return data
    res.status(200).json({
      rankPercentages,
      rankDetails,
    });
  } catch (error) {
    console.error("Error fetching rank statistics:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

//studentcheckbox
     




app.post("/api/teacher/studentCheckbox", async (req, res) => {
  const { teacherID, studentID } = req.body;
  console.log("Teacher id for selecting student: ", teacherID);
  console.log("Student id for selecting student: ", studentID);

  try {
    // Check if this student is already selected by ANY teacher
    const existingStudent = await studentMoreInfo.findOne({
      studentID,
      selectStudent: { $exists: true, $ne: {} }, // Ensure selectStudent is not empty
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "This student has already been selected by another teacher!",
      });
    }

    // Find student and update selectStudent field
    const student = await studentMoreInfo.findOne({ studentID });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Ensure selectStudent exists and is a Map
    student.selectStudent = student.selectStudent || new Map();
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



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
