// const studentModel=require("../Models/studentmodel")
// const teacherModel=require("../Models/teacherModel")



// const verifyEmailController=async(req,res)=>{
//     const { token } = req.query;
//     const { role } = req.query;
//     try {
//       console.log("Verify Route2");
//       let userIDMatchWithToken;
//       let user;
//       if (role == "student") {
//         userIDMatchWithToken = await studentModel.findOne({
//           verificationToken: token,
//         });
//      console.log("userIDMatchWithToken",userIDMatchWithToken)
//         user = await studentModel.findOneAndUpdate(
//           { verificationToken: token },
//           { isVerified: true, verificationToken: null },
//           { new: true }
//         );
//       } else {
//         userIDMatchWithToken = await teacherModel.findOne({
//           verificationToken: token,
//         });
//         console.log("userIDMatchWithToken",userIDMatchWithToken)
//         user = await teacherModel.findOneAndUpdate(
//           { verificationToken: token },
//           { isVerified: true, verificationToken: null },
//           { new: true }
//         );
//       }
//       console.log(user);
//       if (!user) {
//         return res.status(400).json({ message: "Invalid or expired token" });
//       }
//       return res.redirect(
//         `https://educonnect-1-jv7g.onrender.com/SignUp?id=${userIDMatchWithToken._id}&role=${role}`
//       );
//     } catch (error) {
//       console.error("Error during verification:", error);
//       res.status(400).json({ error: "Verification failed" });
//     }
// }
// module.exports={verifyEmailController}




















// const studentModel = require("../Models/studentmodel");
// const teacherModel = require("../Models/teacherModel");

// const verifyEmailController = async (req, res) => {
//   const { token, role } = req.query;

//   try {
//     console.log("Verification attempt received.");
//     console.log("Token:", token);
//     console.log("Role:", role);

//     let user;
//     let userModel = role === "student" ? studentModel : teacherModel;

//     // Find user by token
//     user = await userModel.findOne({ verificationToken: token });

//     console.log("User found:", user);

//     // No user found
//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     // Check token expiry
//     if (user.verificationTokenExpiry < Date.now()) {
//       return res.status(400).json({ message: "Token has expired" });
//     }

//     // Update user verification status
//     user.isVerified = true;
//     user.verificationToken = null;
//     user.verificationTokenExpiry = null;
//     await user.save();

//     // Redirect after successful verification
//     // return res.redirect(
//     //   `https://educonnect-1-jv7g.onrender.com/SignUp?id=${user._id}&role=${role}`
//     // );
//     console.log("apple");
//      return res.json({success:true});
//     setTimeout(() => {
//   console.log("Delayed log after 2s:", token);
// }, 5000);
   
//   } catch (error) {
//     console.error("Error during verification:", error);
//     return res.status(500).json({ message: "Verification failed" });
//   }
// };

// module.exports = { verifyEmailController };



















const studentModel=require("../Models/studentmodel")
const teacherModel=require("../Models/teacherModel")

 const frontendUrl = process.env.FRONTEND_URL;

const verifyEmailController=async(req,res)=>{
    const { token } = req.query;
    const { role } = req.query;
    try {
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
        `${frontendUrl}?id=${userIDMatchWithToken._id}&role=${role}`
      );
    } catch (error) {
      console.error("Error during verification:", error);
      res.status(400).json({ error: "Verification failed" });
    }
}
module.exports={verifyEmailController}