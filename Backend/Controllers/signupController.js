const studentModel = require("../Models/studentmodel");

const signupController = async (req, res) => {
    console.log("trtrh")
  const { name, email, contact, password } = req.body;
  try {
    const user = new studentModel({
      name,
      email,
      contact,
      password,
      // verificationToken,
    });
    const savedUser = await user.save();
    console.log(savedUser)
  } 
  catch (error) {
    console.error("Error during signup:", error);
    res.status(400).json({ error: "Error creating user" });
  }
};
module.exports = { signupController };
