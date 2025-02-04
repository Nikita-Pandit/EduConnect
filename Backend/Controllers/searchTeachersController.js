const teacherMoreInfo = require("../Models/teacherMoreInfo");
const searchTeachersController = async(req,res)=>{
    const { name } = req.query;
  
    try {
      const teachers = await teacherMoreInfo.find({
        name: { $regex: `^${name}`, $options: "i" }, // Match starting letters (case-insensitive)
      });
  
      res.json(teachers);
    } catch (error) {
      console.error("Error searching teachers:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = {searchTeachersController}
  