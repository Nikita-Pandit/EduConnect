const mongoose=require("mongoose")
  const studentSchema=new mongoose.Schema({
    name:String,
    email:String,
    contact:Number,
   password:String,
   isVerified: { type: Boolean, default: false },
   verificationToken: { type: String,default:null }
  })
const studentModel=mongoose.model("students",studentSchema)
module.exports=studentModel