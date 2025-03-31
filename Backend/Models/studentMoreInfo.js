 const mongoose=require("mongoose")
const studentMoreInfoSchema=new mongoose.Schema({
  Bio:{
    type:String,
    required:true
  },
  github:String,
  linkedin:String,
  leetcode:String,
  twitter:String,
  instagram:String,
  projects:String,
  skills: {
    type: [String], // Change from 'type: String' to 'type: [String]'
  },
domain:{
  type:[String] //Array of strings
},
location:{
  type:String,
},
branch:{
  type:String,

},
selectYear:{
  type:String,
},
studentID:String,
name:String,
image:{
  type:String,
  default:"/images/default_image.jpg",
},
selectStudent: {
  type: Map,
  of: Boolean, 
  default: new Map(),
},
rollNo:{
  type:String,
  required:true
},
CGPA:{
  type:Number,
 required:true
}
})
const studentMoreInfo=mongoose.models.studentMoreInfo || mongoose.model("studentMoreInfo",studentMoreInfoSchema)
module.exports=studentMoreInfo