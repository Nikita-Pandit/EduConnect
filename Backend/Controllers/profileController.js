
const studentModel=require("../Models/studentmodel")
const studentMoreInfo=require("../Models/studentMoreInfo")

  const getProfileInfo = async (req, res) => {
    const { id } = req.params;
    console.log("Fetching profile for student ID:", id);
  
    try {
      const moreInfo = await studentMoreInfo.findOne({ studentID: id });
      if (!moreInfo) {
        return res.status(404).json({
          success: false,
          message: "Profile info not found in the database.",
        });
      }
  
      res.status(200).json({ success: true, moreInfo });
    } catch (error) {
      console.error("Error in getProfileInfo:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching profile info from the database.",
        error: error.message,
      });
    }
  };
  
  const createProfileInfo = async (req, res) => {
    console.log("Incoming Request Body:", req.body);
    const { id } = req.params;

    const profileData = { studentID: id, ...req.body };
    try {
      let profile = await studentMoreInfo.findOne({ studentID: id });
  
      if (profile) {
        profile = await studentMoreInfo.findOneAndUpdate({ studentID: id }, profileData, { new: true });
  
      } else {
        profile = await studentMoreInfo.create(profileData);
        await profile.save();
      }
  
      console.log("Profile saved successfully:", profile);
      res.json({
        success: true,
        message: "Profile info saved successfully.",
        profile,
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({
        success: false,
        message: "Error saving profile to the database.",
        error: error.message,
      });
    }
  };
  
  const getStudentInfo = async (req, res) => {
    const { id } = req.params;
  console.log("id in getStudentInfo",id)
    try {
      const student = await studentModel.findById(id);
      if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
  console.log("student in getStudentInfo",getStudentInfo)
      res.status(200).json({
        success: true,
        name: student.name,
        email: student.email,
        contact: student.contact,
      });
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ success: false, message: "Error fetching student data." });
    }
  };
  
  const getProfileImage = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id in image", id);
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded.",
        });
      }
  
      const imagePath = `/uploads/${req.file.filename}`;
      console.log(imagePath)
      const updatedProfile = await studentMoreInfo.findOneAndUpdate(
        { studentID: id },
        { image: imagePath },
        { new: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({
          success: false,
          message: "Student profile not found.",
        });
      }
  
      res.json({ success: true, image: imagePath });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        success: false,
        message: "Error uploading image.",
        error: error.message,
      });
    }
  };
  
  const getStudentIdList = async (req, res) => {
    try {
      const { id } = req.params;
      const studentList = await studentMoreInfo.findOne({ studentID: id });
  
      if (!studentList) {
        return res.status(404).json({
          success: false,
          message: "Student ID not found.",
        });
      }
  
      res.json({
        success: true,
        name: studentList.name,
        roll: studentList.rollNo,
      });
    } catch (error) {
      console.error("Error fetching student list:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching student list.",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    createProfileInfo,
    getProfileInfo,
    getProfileImage,
    getStudentInfo,
    getStudentIdList,
  };
  