const express = require("express");
const app = express();

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const env = dotenv.config();

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

const signupRoutes = require("./Routes/signupRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const projectsRoutes = require("./Routes/projectsRoutes");
const ResearchDoubtsRoutes = require("./Routes/researchDoubtsRoutes");
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
app.use("/api", searchTeachersRoutes);
app.use("/api", verifyEmailRoutes);
app.use("/api", chatRoutes);

// app.get("/api/student/:studentID/rollNumber", async (req, res) => {

//   const { studentID } = req.params;
//   console.log("student id in server to check roll number: ",studentID);
//   try {
//     const student = await teacherMoreInfo.findById();
//     if (student) {
//       res.json({ rollNumber: student.rollNumber });
//     } else {
//       res.status(404).json({ message: "Student not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching roll number" });
//   }
// });
// app.get("/api/supervisedstudents", async (req, res) => {

//   const { teacherID } = req.params;
//   console.log("teacher id is ",teacherID);
//   try {
//     const student = await studentMoreInfo.findById();
//     if (student) {
//       res.json({ rollNumber: student.rollNumber });
//     } else {
//       res.status(404).json({ message: "Student not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching roll number" });
//   }
// });
app.get("/api/supervisedstudents/:teacherID", async (req, res) => {
  console.log("entere ssupervisedstidents");
  const { teacherID } = req.params;
  console.log("Teacher ID is:", teacherID);

  try {
    // Find all students where selectStudent[teacherID] is true
    const students = await studentMoreInfo.find(
      {
        [`selectStudent.${teacherID}`]: true, // Query where teacherID exists and is true
      },
      "name rollNo"
    ); // Only fetch name & rollNumber
    console.log("*****************************************8", students);
    if (students.length > 0) {
      res.json({students});
    } else {
      res.status(404).json({ message: "No students under supervision" });
    }
  } catch (error) {
    console.error("Error fetching supervised students:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});



// // POST endpoint to add a student to teacher's supervision
// app.post('/api/teacher/addStudent', async (req, res) => {
//   const { teacherID, rollNo } = req.body;
// console.log("teacherID in addStudent",teacherID)
// console.log("rollNo in addStudent",rollNo)
//   try {
//     // Validate input
//     if (!teacherID || !rollNo) {
//       return res.status(400).json({ message: 'Teacher ID and Roll Number are required' });
//     }

//     // Check if teacher exists
//     const teacher = await teacherMoreInfo.findOne({ teacherID });
//     if (!teacher) {
//       return res.status(404).json({ message: 'Teacher not found' });
//     }

//     // Check if student exists
//     const student = await studentMoreInfo.findOne({ rollNo });
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Check if student is already supervised by another teacher
//     const existingTeacher = await teacherMoreInfo.findOne({
//       [`selectStudent.${rollNo}`]: true
//     });

//     console.log("existingStudent", existingTeacher);
    
//     if (existingTeacher) {
//       return res.status(400).json({ 
//         message: `Student is already supervised by ${existingTeacher.name}`
//       });
//     }

//     // Add student to teacher's supervision
//     await teacherMoreInfo.findOneAndUpdate(
//       { teacherID },
//       { 
//         $set: { 
//           [`selectStudent.${rollNo}`]: true 
//         } 
//       },
//       { new: true }
//     );

//     // Add teacher reference to student (optional)
//     await studentMoreInfo.findOneAndUpdate(
//       { rollNo },
//       { $set: { teacherID } },
//       { new: true }
//     );

//     res.json({ 
//       message: 'Student added successfully',
//       student: {
//         name: student.name,
//         rollNo: student.rollNo
//       }
//     });
//   } catch (error) {
//     console.error('Error adding student:', error);
//     res.status(500).json({ message: 'Error adding student' });
//   }
// });





app.post('/api/teacher/removeStudent', async (req, res) => {
  const { teacherID, rollNo } = req.body;

  try {
    // Validate input
    if (!teacherID || !rollNo) {
      return res.status(400).json({ message: 'Teacher ID and Roll Number are required' });
    }

    // Check if teacher exists
    const teacher = await teacherMoreInfo.findOne({ teacherID });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if student exists
    const student = await studentMoreInfo.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }


 

    // Remove teacher reference from student (optional)
 

    res.json({ 
      message: 'Student removed successfully',
      student
    });
  } catch (error) {
    console.error('Error removing student:', error);
    res.status(500).json({ message: 'Error removing student' });
  }
});



















// // GET endpoint to fetch supervised students
// app.get('/api/teacher/supervisedstudents/:teacherID', async (req, res) => {
//   try {
//     const teacher = await teacherMoreInfo.findOne({ 
//       teacherID: req.params.teacherID 
//     });

//     if (!teacher) {
//       return res.status(404).json({ message: 'Teacher not found' });
//     }

//     // Get all students where selectStudent is true
//     const supervisedStudents = [];
//     if (teacher.selectStudent) {
//       for (const [rollNo, isSelected] of teacher.selectStudent) {
//         if (isSelected) {
//           const student = await studentMoreInfo.findOne({ rollNo });
//           if (student) {
//             supervisedStudents.push({
//               name: student.name,
//               rollNo: student.rollNo
//             });
//           }
//         }
//       }
//     }

//     res.json({ students: supervisedStudents });
//   } catch (error) {
//     console.error('Error fetching supervised students:', error);
//     res.status(500).json({ message: 'Error fetching supervised students' });
//   }
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
