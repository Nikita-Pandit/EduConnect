const nodemailer = require('nodemailer');
const resetPassword = async (email, resetToken,name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });

         // Dynamic base URL (use the correct domain for dev/prod)
         const baseUrl = process.env.BASE_URL || 'http://localhost:3002';
         const frontendUrl=process.env.FRONTEND_URL ||'http://localhost:5173'

         const mailOptions = {
            to: email,
            subject: 'Password Reset Request',
            html: `
              <p>Hi ${name},</p>
              <p>You requested a password reset. Click the link below to reset your password:</p>
              <a href="${frontendUrl}/Resetpassword/${resetToken}">Reset Password</a>
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