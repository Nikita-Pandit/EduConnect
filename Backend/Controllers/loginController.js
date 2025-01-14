const studentModel = require('../Models/studentmodel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentMoreInfo = require("../Models/studentMoreInfo");

const loginController = async (req, res) => {
  const {email,password}=req.body
  console.log(email)
  console.log(password)
      try{
        const user= await studentModel.findOne({email})
        console.log(user)
        const userMoreDetails=await studentMoreInfo.findOne({studentID:user._id})
        console.log(userMoreDetails)
        if(user){
          const isPasswordValid =  await bcrypt.compare(password,user.password)
          if(isPasswordValid){
            // If password matches, send a success response
            // const token=jwt.sign(
            //     {userID:user._id,email:user.email},
            //     process.env.JWT_SECRET_KEY, 
            //     { expiresIn: '1h' }  // Expiration time (optional)
            // )
            console.log(isPasswordValid)
                res.status(200).json({ success: true, message: "Login successful",userMoreDetails});
            } 
                
      }
      else {
        res.status(404).json({ success: false, message: "No record found in the DB." });
      }
    }
    catch(error){
      console.error("Something went wrong", error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  module.exports={loginController}