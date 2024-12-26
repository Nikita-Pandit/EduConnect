const studentMoreInfo = require("../Models/studentMoreInfo");

const createProfileInfo = async (req,res) => {
    const {Bio,github,instagram,linkedin,twitter,leetcode,projects,skills,location,branch,selectYear} = req.body;
      try{
        const profile = new studentMoreInfo({
            Bio,
            github,
            instagram,
            linkedin,
            twitter,
            leetcode,
            projects ,
            skills,
            location,
            branch,
            selectYear
            // image:  `/uploads/${image_filename}`,
            // studentID:id
        })
        await profile.save();
        res.json({success:true,message:"Profile information saved in database successfully"})
      }
      catch(error){
        console.error("Error in saving profile in the database: ",error.message);
        res.json({success:false,message:"Error"})
      }
}
module.exports = {createProfileInfo}