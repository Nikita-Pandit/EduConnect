// const {createProfileInfo,getProfileInfo,getProfileImage,getStudentInfo,getStudentIdList} = require('../Controllers/profileController')

// const express=require("express")
//  const multer=require("multer")
// const router=express.Router()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//         filename: (req, file, cb) => {
//             return  cb(null,`${Date.now()}-${file.originalname}`);
//         }
//     })

//  const upload = multer({ storage: storage})

// // const upload = require("../middlewares/upload");
//  router.post("/Profile/:id",createProfileInfo);

//  router.get("/Profile/:id",getProfileInfo)
// router.post("/Profile/:id/uploadImage",upload.single('image'),getProfileImage);
// router.get("/student/:id",getStudentInfo)
// router.get("/student/idList/:id",getStudentIdList)
//  module.exports=router







// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload"); // Cloudinary multer
// const {
//   createProfileInfo,
//   getProfileInfo,
//   getProfileImage,
//   getStudentInfo,
//   getStudentIdList,
// } = require("../Controllers/profileController");

// // Profile routes
// router.post("/Profile/:id", createProfileInfo);
// router.get("/Profile/:id", getProfileInfo);
// router.post("/Profile/:id/uploadImage", upload.single("image"), getProfileImage);
// router.get("/student/:id", getStudentInfo);
// router.get("/student/idList/:id", getStudentIdList);

// module.exports = router;






// // Routes/profileRoutes.js
// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload");

// const {
//   createProfileInfo,
//   getProfileInfo,
//   getProfileImage,   // controller handles Cloudinary upload from buffer
//   getStudentInfo,
//   getStudentIdList,
// } = require("../Controllers/profileController");

// router.post("/Profile/:id", createProfileInfo);
// router.get("/Profile/:id", getProfileInfo);

// // Upload to Cloudinary (buffer) → save URL in DB
// router.post("/Profile/:id/uploadImage", upload.single("image"), getProfileImage);

// router.get("/student/:id", getStudentInfo);
// router.get("/student/idList/:id", getStudentIdList);

// module.exports = router;









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
