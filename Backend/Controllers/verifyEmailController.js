const studentModel=require("../Models/studentmodel")
const teacherModel=require("../Models/teacherModel")



const verifyEmailController=async(req,res)=>{
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
}
module.exports={verifyEmailController}