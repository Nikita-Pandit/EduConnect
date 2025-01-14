const express=require("express")
const router=express.Router()

const {resetPasswordController}=require("../Controllers/resetPasswordController")
router.post("/reset-password",resetPasswordController)
module.exports=router