const nodemailer = require("nodemailer")
//  const backendUrl = "https://edu-connect-backend-jet.vercel.app"
 const backendUrl = process.env.BASE_URL;
 const sendVerificationMail = async (email,token,role)=> {
    try{
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });

            // Construct verification URL
    const verificationLink = `${backendUrl}/api/verify?token=${token}&role=${role}`;
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

        //         const mailOptions = {
        //     from: "22054434@kiit.ac.in",
        //     to: email,
        //     subject: "Verify Your Email",
        //     html:`
        //     <h1>Email Verification</h1>
        //     <p>Please verify your email by clicking the link below:</p>
        //     <a href="${backendUrl}/api/verify?token=${token}&role=${role}">Verify Email</a> `,
          
        //  };


         const mailOptions = {
      from: `"EduConnect Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - EduConnect",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2 style="color: #4CAF50;">Email Verification</h2>
          <p>Hi there,</p>
          <p>Thanks for signing up! Please verify your email by clicking the button below:</p>
          <a href="${verificationLink}" 
             style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
             Verify Email
          </a>
          <p style="margin-top: 20px;">If you did not request this, you can safely ignore this email.</p>
          <p>– EduConnect Team</p>
        </div>
      `,
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




    
    
