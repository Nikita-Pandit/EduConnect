const {getProjectController}=require("../Controllers/projectsController")
const express=require("express")
const router=express.Router();


router.get("/Project",getProjectController)
module.exports=router