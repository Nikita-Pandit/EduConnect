const {createTeacherProfileInfo,getTeacherProfileInfo,getTeacherProfileImage} = require('../Controllers/teacherProfileController')

const express=require("express")
const multer=require("multer")
const router=express.Router()

// const storage = multer.diskStorage({
//     destination: 'uploads',
//      filename: (req, file, cb) => {
//          return  cb(null,`${Date.now()}${file.originalname}`);
//      }
//  })

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
        filename: (req, file, cb) => {
            return  cb(null,`${Date.now()}-${file.originalname}`);
        }
    })

 const upload = multer({ storage: storage})
 router.post("/teacherProfile/:id",createTeacherProfileInfo);

 router.get("/teacherProfile/:id",getTeacherProfileInfo)
router.post("/teacherProfile/:id/uploadImage",upload.single('image'),getTeacherProfileImage);
 module.exports=router