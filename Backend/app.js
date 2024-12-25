const express = require('express')
const app = express()
const dotenv = require('dotenv')
const env = dotenv.config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;

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


  
app.get("/SignUp",(req,res)=>{
    return res.json("Hellonworld")
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})