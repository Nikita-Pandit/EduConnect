const studentModel = require("../Models/studentmodel");
const crypto = require('crypto');
const resetPassword = require('../Utils/resetPassword');

const forgetPasswordController = async (req,res) =>{
    const {email} = req.body;
    console.log("email in forgot-password",email)
    try{
        const user = await studentModel.findOne({email});
        if(!user){
            return res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
        }
        console.log("user in forgot-password",user)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = Date.now()+3600000;  //1 hour validity
        
        //save token and expiration time
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;
        await user.save().catch(error => {
            console.error('Error saving user: ',error);
            return res.status(500).json({message:'Failed to save reset token.Please try again later.'})
        });
        //send the reset email
        const resetEmailSent = await resetPassword(email,resetToken,user.name);
        if(resetEmailSent){
            res.status(200).json({success:true,message:'If the email exists, a reset link will be sent.'});
        }else{
            res.status(500).json({ message: 'Failed to send reset email. Please try again later.' });
        }
    }catch(err){
        console.error('Error in forgotPasswordController:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
 
    }
}
module.exports = {forgetPasswordController}
