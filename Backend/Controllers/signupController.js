const studentModel = require("../Models/studentmodel");
const teacherModel = require("../Models/teacherModel");
// const sendVerificationMail = require('../Utils/sendVerificationMail');
const crypto = require('crypto');

const signupController = async (req, res) => {
    const role = req.query.role; // Extract role from query parameters
    const { email, name, password, contact } = req.body;
    console.log("Received data:", name, email, contact);

    try {
        // Generate a unique token for email verification
        // const verificationToken = crypto.randomBytes(32).toString('hex');
        // const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Token valid for 24 hours

        // Create a new user based on the role (student or teacher)
        if (role === "student") { // Check if the role is "student"
            const user = new studentModel({
                name,
                email,
                contact,
                password,
                // verificationToken,
                // verificationTokenExpiry
            });
            await user.save(); // Save student to the database
        } else if (role === "teacher") { // Check if the role is "teacher"
            const user = new teacherModel({
                name,
                email,
                contact,
                password,
                // verificationToken,
                // verificationTokenExpiry
            });
            await user.save(); // Save teacher to the database
            console.log("User created:", user);
            
// console.log("User isVerified status:", user.isVerified);
        } else {
            // Handle invalid role
            return res.status(400).json({ message: 'Invalid role specified.' }); // Return error for invalid role
        }

        // Send the verification email
        //const emailSent = await sendVerificationMail(email, verificationToken, role);

        // if (emailSent) {
        //     res.status(201).json({ message: 'User created. Verification email sent!' });
        //     console.log('User created. Verification email sent!');
        // } else {
        //     res.status(500).json({ message: 'User created, but email not sent. Try again.' });
        //     console.log('User created, but email not sent. Try again.');
        // }
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(400).json({ error: 'Error creating user' }); // Return error if user creation fails
    }
};

module.exports = { signupController };
