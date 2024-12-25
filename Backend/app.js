const express = require('express')
const app = express()
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


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})