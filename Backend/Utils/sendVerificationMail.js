const nodemailer = require("nodemailer")

const sendVerificationMail = async (email,token,role)=> {
    try{
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "shahsimran813@gmail.com",
                pass: "alibdvbdiurmhzxi",
            },
        });
        const mailOptions = {
            from: "shahsimran813@gmail.com",
            to: email,
            subject: "Verify Your Email",
            html:`
            <h1>Email Verification</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="http://localhost:3002/api/verify?token=${token}&role=${role}">Verify Email</a> `,
          
         };
            const info = await transporter.sendMail(mailOptions);
            console.log(info)
            console.log('Verification email sent:', info.response);
            return true;
    
        } 
        
        catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    };
    
    module.exports = sendVerificationMail;