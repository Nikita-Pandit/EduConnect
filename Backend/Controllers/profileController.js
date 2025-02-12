const studentMoreInfo= require("../Models/studentMoreInfo");
const studentModel = require("../Models/studentmodel");
const getProfileInfo = async (req, res) => {
  const { id } = req.params;
 console.log(id)
  try {
    const moreInfo = await studentMoreInfo.findOne({ studentID: id });
    console.log("Before moreInfo", moreInfo);
    if (!moreInfo) {
      return res.status(404).json({ success: false, message: "Profile info not matched from the database." });
    }
    console.log("After", moreInfo);
    res.status(200).json({ success: true, moreInfo });
  } catch (error) {
    console.error("Error in getProfileInfo:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the profile info from the db.",
      error: error.message,
    });
  }
};

const createProfileInfo = async (req, res) => {
  console.log("Request Body:", req.body);
//console.log("Uploaded File:", req.file)
const {id}=req.params;
  const {name,Bio, github,linkedin,leetcode,twitter,instagram,projects,skills,location,branch,selectYear,domain,image,selectStudent,rollNo}=req.body
  try {
    const matchID=await studentMoreInfo.findOne({ studentID:id})
    if(matchID){
  const updated = await studentMoreInfo.findOneAndUpdate(
        { studentID:id},
        {name,Bio, github,linkedin,leetcode,twitter,instagram,projects,skills,location,branch,selectYear,domain,image,selectStudent,rollNo}
          )
    }
    else{
      profile = new studentMoreInfo({
        name,
    Bio,
    github,
    instagram,
    linkedin,
    twitter,
    leetcode,
    projects ,
    skills,
    domain: Array.isArray(domain) ? domain : [],
    location,
    branch,
    selectYear,
    studentID:id,
    image,
    selectStudent,
    rollNo
    })
    await profile.save();
    }
    
    console.log("After Saving",profile)
     res.json({success:true,message:"Profile info saved in the db successfully.",profile})
  } catch (error) {
    console.error("Error in saving profile in the database:", error.message);
      res.json({ success: false, message: "Error" })
  }
}
const getStudentInfo = async(req,res)=>{
  const { id } = req.params;
  try {
    const student = await studentModel.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log(student);
    res.status(200).json({
      name: student.name,
      email: student.email,
      contact: student.contact,
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Error fetching student" });
  }
}
const getProfileImage=async(req,res)=>{
try{
  const {id}=req.params
const imagePath = `/uploads/${req.file.filename}`;
await studentMoreInfo.findOneAndUpdate({ studentID: id }, { image: imagePath });
  res.json({ success: true, image: imagePath })
}
catch(error){
res.status(500).json({ success: false, message: "Error uploading image.", error: error.message });
}
}

module.exports={createProfileInfo,getProfileInfo,getProfileImage,getStudentInfo}