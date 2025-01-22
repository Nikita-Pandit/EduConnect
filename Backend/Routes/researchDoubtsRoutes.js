const {getResearchDoubtsController}=require("../Controllers/researchDoubtsController")
const express=require("express")
const router=express.Router();


router.get("/ResearchDoubts",getResearchDoubtsController)
module.exports=router