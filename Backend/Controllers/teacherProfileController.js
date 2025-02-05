const teacherMoreInfo = require("../Models/teacherMoreInfo");
const teacherModel = require("../Models/teacherModel");
const studentMoreInfo = require("../Models/studentMoreInfo");

const getTeacherProfileInfo = async (req, res) => {
  // console.log("hello");
  const { teacherId } = req.params;
  try {
    const moreInfo = await teacherMoreInfo.findOne({ teacherID: teacherId });
    console.log("Before moreInfo", moreInfo);
    if (!moreInfo) {
      // console.log("if");
      return res.status(404).json({
        success: false,
        message: "Profile info not matched from the database.",
      });
    }
    // console.log("After", moreInfo);
    res.status(200).json({ success: true, moreInfo });
  } catch (error) {
    console.error("Error in getProfileInfo:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the profile info from the db.",
      error: error.message,
    });
  }
};

const getTeacherInfo=async(req,res)=>{
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
}

const createTeacherProfileInfo = async (req, res) => {
  console.log("Request Body:", req.body);
  const { teacherId } = req.params;

  const {
    name,
    Bio,
    github,
    linkedin,
    twitter,
    location,
    domain,
    image,
    rank,
  } = req.body;
  // console.log("rank in createTeacherProfileInfo", rank);
  try {
    const matchID = await teacherMoreInfo.findOne({ teacherID: teacherId });
    if (matchID) {
      const updated = await teacherMoreInfo.findOneAndUpdate(
        { teacherID: teacherId },
        { name, Bio, github, linkedin, twitter, location, domain, image }
      );
    } else {
      profile = new teacherMoreInfo({
        name,
        Bio,
        github,
        linkedin,
        twitter,
        domain: Array.isArray(domain) ? domain : [],
        location,
        teacherID: teacherId,
        image,
        rank,
      });
      await profile.save();
    }
    console.log("After Saving", profile);
    res.json({
      success: true,
      message: "Profile info saved in the db successfully.",
      profile,
    });
  } catch (error) {
    console.error("Error in saving profile in the database:", error.message);
    res.json({ success: false, message: "Error" });
  }
};

const getTeacherProfileImage = async (req, res) => {
  try {
    console.log("backend teacher image");
    const { teacherId } = req.params;
    const imagePath = `/uploads/${req.file.filename}`;
    // console.log("image path", imagePath);
    await teacherMoreInfo.findOneAndUpdate(
      { teacherID: teacherId },
      { image: imagePath }
    );
    res.json({ success: true, image: imagePath });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading image.",
      error: error.message,
    });
  }
};


const rankTeacher=async(req,res)=>{
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
}

//show piechart
const showPiChart=async(req,res)=>{
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
}
const   showStudentCheckbox=async(req,res)=>{
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
}
module.exports = {
  createTeacherProfileInfo,
  getTeacherProfileInfo,
  getTeacherProfileImage,
  getTeacherInfo,
  rankTeacher,
  showPiChart,
  showStudentCheckbox
};
