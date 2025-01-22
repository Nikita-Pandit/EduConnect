
const mongoose=require("mongoose")
const teacherMoreInfoSchema=new mongoose.Schema({
  Bio:{
    type:String,
    required:true
  },
  github:String,
  linkedin:String,
  twitter:String,
domain:{
  type:[String] //Array of strings
},
location:{
  type:String,
},
studentID:String,
name:String,
image:{
  type:String,
  default:"/images/default_image.jpg",
}
})
const teacherMoreInfo=mongoose.model("teacherMoreInfo",teacherMoreInfoSchema)
module.exports=teacherMoreInfo