const {getStudentsController}=require("../Controllers/StudentsController")
const express=require("express")
const router=express.Router();


router.get("/Students",getStudentsController)
module.exports=router