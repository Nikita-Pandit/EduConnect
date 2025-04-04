
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
  of: Number, 
  default: new Map(),
}

})
const teacherMoreInfo=mongoose.models.teacherMoreInfo || mongoose.model("teacherMoreInfo",teacherMoreInfoSchema)
module.exports=teacherMoreInfo