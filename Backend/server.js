const express = require('express')
const app = express()
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
const env = dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const studentModel = require('./Models/studentmodel')
const signupRoutes = require('./Routes/signupRoutes')
const loginRoutes = require('./Routes/loginRoutes')
const profileRoutes = require('./Routes/profile.Routes')
const PORT = process.env.PORT || 5000;

app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(process.env.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });



app.use("/api",signupRoutes)
app.use("/api",loginRoutes)
app.use("/api",profileRoutes)


app.get('/verify',async (req,res)=>{
  const {token} = req.query
  
  try{
    console.log("Verify Route2")
    //find the user with token
    const userIDMatchWithToken = await studentModel.findOne({verificationToken:token})
    const user = await studentModel.findOneAndUpdate(
      { verificationToken: token },
      {isVerified:true,verificationToken:null},
      {new:true}
    );
    console.log(user)
    if(!user){
      return res.status(400).json({message:"Invalid or expired token"})
    }
    return res.redirect(`http://localhost:5173/SignUp?id=${userIDMatchWithToken._id}`);
  }catch (error) {
    console.error('Error during verification:', error);
    res.status(400).json({ error: 'Verification failed' });
}
})

app.get('/api/student/:id', async (req, res) => {
  const { id } = req.params; // Extract the id from the request params
  try {
    // Find the student by ID in the database
    const student = await studentModel.findById(id);
    //const moreinfo=await studentMoreInfo
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
console.log(student)
    // Send the student name as a response
    res.status(200).json({ name: student.name,
    email:student.email,
    contact:student.contact
     });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})