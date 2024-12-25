const studentModel = require('../Models/studentmodel');

const loginController = async (req, res) => {
  console.log("Received data: ", req.body); // Debug log
  const { email, password } = req.body;
  const student = await studentModel.findOne({ email: email });
  if (student) {
    if (student.password == password) {
      res.json("Login successful");
    } else {
      res.json("Login unsuccessful");
    }
  } else {
    res.json("No record exists");
  }
};
module.exports={loginController}