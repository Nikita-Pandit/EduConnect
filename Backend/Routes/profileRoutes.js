const {createProfileInfo,getProfileInfo,getProfileImage,getStudentInfo,getStudentIdList} = require('../Controllers/profileController')

const express=require("express")
const multer=require("multer")
const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
        filename: (req, file, cb) => {
            return  cb(null,`${Date.now()}-${file.originalname}`);
        }
    })

 const upload = multer({ storage: storage})
 router.post("/Profile/:id",createProfileInfo);

 router.get("/Profile/:id",getProfileInfo)
router.post("/Profile/:id/uploadImage",upload.single('image'),getProfileImage);
router.get("/student/:id",getStudentInfo)
router.get("/student/idList/:id",getStudentIdList)
 module.exports=router