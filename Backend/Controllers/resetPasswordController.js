const studentModel= require("../Models/studentmodel")
const bcrypt=require("bcrypt")

const resetPasswordController=async(req,res)=>{
    const { token, password } = req.body; 
    console.log("Hello in resetPasswordController")
    console.log(password)
    try {
       const user = await studentModel.findOne({
         resetPasswordToken: token,
         resetPasswordExpires: { $gt: Date.now() }, // Check token expiration
       });
   console.log(user)
       if (!user) {
         return res.status(400).json({ message: 'Invalid or expired token.' });
       }
       user.password = password;
       // Clear the reset token and expiration
       user.resetPasswordToken = undefined;
       user.resetPasswordExpires = undefined;
   console.log(user)
       await user.save();
       console.log(user)
       try {
        await user.save();
        res.status(200).json({ message: 'Password reset successful.' });
    } catch (saveError) {
        console.error("Error saving user:", saveError);
        return res.status(500).json({ message: 'Error saving password.' });
    }
    } 
    catch (saveError) {
        console.error("Error saving user:", saveError);
        return res.status(500).json({ message: 'Error saving password.' });
    }

}
module.exports={resetPasswordController}