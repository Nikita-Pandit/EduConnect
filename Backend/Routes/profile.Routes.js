const {createProfileInfo,getProfileInfo} = require('../Controllers/profileController')

const express=require("express")
const multer=require("multer")
const router=express.Router()

const storage = multer.diskStorage({
    destination: 'uploads',
     filename: (req, file, cb) => {
         return  cb(null,`${Date.now()}${file.originalname}`);
     }
 })

 const upload = multer({ storage: storage})
 router.post("/Profile/:id",upload.single('image'),createProfileInfo);
 router.get("/Profile/:id",getProfileInfo)
 module.exports=router