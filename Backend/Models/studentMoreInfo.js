  
//   const mongoose=require("mongoose")
//   const studentMoreInfoSchema=new mongoose.Schema({
//     name:{
//       type:String,
//     },
//     Bio:{
//       type:String,
//       required:true
//     },
//     github:String,
//     linkedin:String,
//     leetcode:String,
//     twitter:String,
//     instagram:String,
//     projects:String,
//    skills:{
//     type:[String]
//     //required:true
//   },
//   domain:{
//     type:String
//   },
//   location:{
//     type:String,
//     ///required:true
//   },
//   branch:{
//     type:String,
//    // required:true
//   },
//   selectYear:{
//     type:String,
//     //required:true
//   },
//   image:{
//     type:String,
//     default:"/images/default_image.jpg",
//   },
//   studentID:String
//   })
// const studentMoreInfo=mongoose.model("studentMoreInfo",studentMoreInfoSchema)
// module.exports=studentMoreInfo

  
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
 skills:{
  type:String,

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
}
})
const studentMoreInfo=mongoose.model("studentMoreInfo",studentMoreInfoSchema)
module.exports=studentMoreInfo