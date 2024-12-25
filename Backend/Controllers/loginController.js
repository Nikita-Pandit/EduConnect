const studentModel = require('../Models/studentmodel');

const loginController = async (req, res) => {
  console.log("Received data: ", req.body); // Debug log
  const { email, password } = req.body;
  const student = await studentModel.findOne({ email: email });
  console.log("Hello student")
  console.log(student)
  if (student) {
    console.log(student)
    if (student.password === password) {
      console.log(student.password)
      res.json("Login successful");
    } else {
      res.json("Login unsuccessful");
    }
  } else {
    res.json("No record exists");
  }
};
module.exports={loginController}