
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
teacherID:String,
name:String,
image:{
  type:String,
  default:"/images/default_image.jpg",
},
rank: {
  type: Map,
  of: Number, // Assuming rank is a number (e.g., 1, 2, 3, etc.)
  default: new Map(),
}

})
const teacherMoreInfo=mongoose.model("teacherMoreInfo",teacherMoreInfoSchema)
module.exports=teacherMoreInfo