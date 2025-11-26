const nodemailer = require('nodemailer');
 const frontendUrl = "https://edu-connect-frontend-rosy.vercel.app"
 
const resetPassword = async (email, resetToken,name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });


         const mailOptions = {
            to: email,
            subject: 'Password Reset Request',
            html: `
              <p>Hi ${name},</p>
              <p>You requested a password reset. Click the link below to reset your password:</p>
              <a href="${frontendUrl}/${resetToken}">Reset Password</a>
              <p>If you did not request this, please ignore this email.</p>
            `,
          };   
        const info = await transporter.sendMail(mailOptions);
        console.log('Password Reset email sent:', info.response);
        return true;

    } 
    
    catch (error) {
        console.error('Error sending reset email:', error.message);
        return false;
    }
};

module.exports = resetPassword;
