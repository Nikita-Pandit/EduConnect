

const bcrypt = require("bcrypt");
const studentModel = require("../Models/studentmodel");
const teacherModel = require("../Models/teacherModel");
const studentMoreInfo = require("../Models/studentMoreInfo");
const teacherMoreInfo = require("../Models/teacherMoreInfo");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received Login Request for:", email);
  console.log(password);
  try {
    const user =  
      (await studentModel.findOne({ email }))  || 
      (await teacherModel.findOne({ email }))
      
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const userMoreDetails =
      (await studentMoreInfo.findOne({ studentID: user._id })) ||
      (await teacherMoreInfo.findOne({ teacherID: user._id }));

    console.log("User More Details:", userMoreDetails);

    res.status(200).json({ success: true, message: "Login successful", userMoreDetails });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = { loginController};
