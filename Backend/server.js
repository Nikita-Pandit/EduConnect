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


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})