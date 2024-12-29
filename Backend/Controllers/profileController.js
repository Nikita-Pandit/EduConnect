const studentMoreInfo = require("../Models/studentMoreInfo");

const createProfileInfo = async (req,res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file)
  const {id}=req.params;

    const {name,Bio,github,instagram,linkedin,twitter,domain,leetcode,projects,skills,location,branch,selectYear} = req.body;
      try{
        let image_filename = req.file ? req.file.filename : null;
        if (!image_filename) {
            return res.status(400).json({ success: false, message: "Image upload failed" });
        }
        const profile = new studentMoreInfo({
            name,
            Bio,
            github,
            instagram,
            linkedin,
            twitter,
            leetcode,
            projects ,
            skills,
            domain,
            location,
            branch,
            selectYear,
            image:  `/uploads/${image_filename}`,
            studentID:id
        })
        await profile.save();
        res.json({success:true,message:"Profile information saved in database successfully"})
      }
      catch(error){
        console.error("Error in saving profile in the database: ",error.message);
        res.json({success:false,message:"Error"})
      }
}


const getProfileInfo=async (req,res)=>{
  const {id}=req.params;
  try{
    const moreInfo= await studentMoreInfo.findOne({studentID:id})
    if(!moreInfo){
      return res.status(404).json({ success: false, message: "Profile info not matched from the database." });
    }
    res.status(200).json({ success: true, moreInfo});
  }
  catch(error){
    console.error("Error in getProfileInfo:", error.message);
    res.status(500).json({ success: false, message: "An error occurred while fetching the profile info from the db.", error: error.message });
  }
  }
  
  
  module.exports={createProfileInfo,getProfileInfo} 