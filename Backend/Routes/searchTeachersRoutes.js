const express=require("express")
const router=express.Router()

const {searchTeachersController}=require("../Controllers/searchTeachersController")
router.get("/searchTeachers",searchTeachersController)
module.exports=router