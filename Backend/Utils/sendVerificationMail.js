const nodemailer = require("nodemailer")
 const backendUrl = process.env.BASE_URL || 'http://localhost:3002';
const sendVerificationMail = async (email,token,role)=> {
    try{
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });
        // const mailOptions = {
        //     from: "22054434@kiit.ac.in",
        //     to: email,
        //     subject: "Verify Your Email",
        //     html:`
        //     <h1>Email Verification</h1>
        //     <p>Please verify your email by clicking the link below:</p>
        //     <a href="${baseUrl}/verify?token=${token}&role=${role}">Verify Email</a>
        //     `,
          
        //  };

                const mailOptions = {
            from: "22054434@kiit.ac.in",
            to: email,
            subject: "Verify Your Email",
            html:`
            <h1>Email Verification</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${backendUrl}/api/verify?token=${token}&role=${role}">Verify Email</a> `,
          
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




    
    
