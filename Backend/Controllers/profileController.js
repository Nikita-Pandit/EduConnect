
// const studentModel=require("../Models/studentmodel")
// const studentMoreInfo=require("../Models/studentMoreInfo")

//   const getProfileInfo = async (req, res) => {
//     const { id } = req.params;
//     console.log("Fetching profile for student ID:", id);
  
//     try {
//       const moreInfo = await studentMoreInfo.findOne({ studentID: id });
//       if (!moreInfo) {
//         return res.status(404).json({
//           success: false,
//           message: "Profile info not found in the database.",
//         });
//       }
  
//       res.status(200).json({ success: true, moreInfo });
//     } catch (error) {
//       console.error("Error in getProfileInfo:", error);
//       res.status(500).json({
//         success: false,
//         message: "Error fetching profile info from the database.",
//         error: error.message,
//       });
//     }
//   };
  
//   const createProfileInfo = async (req, res) => {
//     console.log("Incoming Request Body:", req.body);
//     const { id } = req.params;

//     const profileData = { studentID: id, ...req.body };
//     try {
//       let profile = await studentMoreInfo.findOne({ studentID: id });
  
//       if (profile) {
//         profile = await studentMoreInfo.findOneAndUpdate({ studentID: id }, profileData, { new: true });
  
//       } else {
//         profile = await studentMoreInfo.create(profileData);
//         await profile.save();
//       }
  
//       console.log("Profile saved successfully:", profile);
//       res.json({
//         success: true,
//         message: "Profile info saved successfully.",
//         profile,
//       });
//     } catch (error) {
//       console.error("Error saving profile:", error);
//       res.status(500).json({
//         success: false,
//         message: "Error saving profile to the database.",
//         error: error.message,
//       });
//     }
//   };
  
//   const getStudentInfo = async (req, res) => {
//     const { id } = req.params;
//   console.log("id in getStudentInfo",id)
//     try {
//       const student = await studentModel.findById(id);
//       if (!student) {
//         return res.status(404).json({ success: false, message: "Student not found" });
//       }
//   console.log("student in getStudentInfo",getStudentInfo)
//       res.status(200).json({
//         success: true,
//         name: student.name,
//         email: student.email,
//         contact: student.contact,
//       });
//     } catch (error) {
//       console.error("Error fetching student:", error);
//       res.status(500).json({ success: false, message: "Error fetching student data." });
//     }
//   };


//   const getProfileImage = async (req, res) => {
//     try {
//       const { id } = req.params;
//       console.log("id in image", id);
//       if (!req.file) {
//         return res.status(400).json({
//           success: false,
//           message: "No image uploaded.",
//         });
//       }
  
//       const imagePath = `/uploads/${req.file.filename}`;
//       console.log("imagePath", imagePath)
//       const updatedProfile = await studentMoreInfo.findOneAndUpdate(
//         { studentID: id },
//         { image: imagePath },
//         { new: true }
//       );
  
//       if (!updatedProfile) {
//         return res.status(404).json({
//           success: false,
//           message: "Student profile not found.",
//         });
//       }
  
//       res.json({ success: true, image: imagePath });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       res.status(500).json({
//         success: false,
//         message: "Error uploading image.",
//         error: error.message,
//       });
//     }
//   };
  
//   const getStudentIdList = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const studentList = await studentMoreInfo.findOne({ studentID: id });
  
//       if (!studentList) {
//         return res.status(404).json({
//           success: false,
//           message: "Student ID not found.",
//         });
//       }
  
//       res.json({
//         success: true,
//         name: studentList.name,
//         roll: studentList.rollNo,
//       });
//     } catch (error) {
//       console.error("Error fetching student list:", error);
//       res.status(500).json({
//         success: false,
//         message: "Error fetching student list.",
//         error: error.message,
//       });
//     }
//   };
  
//   module.exports = {
//     createProfileInfo,
//     getProfileInfo,
//     getProfileImage,
//     getStudentInfo,
//     getStudentIdList,
//   };
  





// const studentModel = require("../Models/studentmodel");
// const studentMoreInfo = require("../Models/studentMoreInfo");

// // Fetch profile info
// // const getProfileInfo = async (req, res) => {
// //   const { id } = req.params;
// //   console.log("Fetching profile for student ID:", id);

// //   try {
// //     const moreInfo = await studentMoreInfo.findOne({ studentID: id });
// //     if (!moreInfo) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Profile info not found in the database.",
// //       });
// //     }

// //     res.status(200).json({ success: true, moreInfo });
// //   } catch (error) {
// //     console.error("Error in getProfileInfo:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Error fetching profile info from the database.",
// //       error: error.message,
// //     });
// //   }
// // };

// const getProfileInfo = async (req, res) => {
//   const { id } = req.params;
//   console.log("Fetching profile for student ID:", id);

//   try {
//     const moreInfo = await studentMoreInfo.findOne({ studentID: id });
//     if (!moreInfo) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile info not found in the database.",
//       });
//     }

//     // Ensure default image if none exists
//     const imageWithFallback =
//       moreInfo.image ||
//       `${process.env.BACKEND_URL}/images/default_image.jpg`;

//     res.status(200).json({
//       success: true,
//       moreInfo: {
//         ...moreInfo.toObject(),
//         image: imageWithFallback,
//       },
//     });
//   } catch (error) {
//     console.error("Error in getProfileInfo:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching profile info from the database.",
//       error: error.message,
//     });
//   }
// };


// // Create or update profile info
// const createProfileInfo = async (req, res) => {
//   console.log("Incoming Request Body:", req.body);
//   const { id } = req.params;

//   const profileData = { studentID: id, ...req.body };
//   try {
//     let profile = await studentMoreInfo.findOne({ studentID: id });

//     if (profile) {
//       profile = await studentMoreInfo.findOneAndUpdate(
//         { studentID: id },
//         profileData,
//         { new: true }
//       );
//     } else {
//       profile = await studentMoreInfo.create(profileData);
//       await profile.save();
//     }

//     console.log("Profile saved successfully:", profile);
//     res.json({
//       success: true,
//       message: "Profile info saved successfully.",
//       profile,
//     });
//   } catch (error) {
//     console.error("Error saving profile:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error saving profile to the database.",
//       error: error.message,
//     });
//   }
// };

// // Fetch basic student info
// const getStudentInfo = async (req, res) => {
//   const { id } = req.params;
//   console.log("id in getStudentInfo", id);

//   try {
//     const student = await studentModel.findById(id);
//     if (!student) {
//       return res.status(404).json({ success: false, message: "Student not found" });
//     }

//     console.log("student in getStudentInfo", student);
//     res.status(200).json({
//       success: true,
//       name: student.name,
//       email: student.email,
//       contact: student.contact,
//     });
//   } catch (error) {
//     console.error("Error fetching student:", error);
//     res.status(500).json({ success: false, message: "Error fetching student data." });
//   }
// };

// // Upload profile image to Cloudinary
// const getProfileImage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Uploading image for student ID:", id);

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded.",
//       });
//     }

//     // Use Cloudinary URL instead of local path
//     const imageUrl = req.file.path || null;
//     console.log("Cloudinary image URL:", imageUrl);

//     const updatedProfile = await studentMoreInfo.findOneAndUpdate(
//       { studentID: id },
//       { image: imageUrl },
//       { new: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({
//         success: false,
//         message: "Student profile not found.",
//       });
//     }

//     res.json({ success: true, image: imageUrl, profile: updatedProfile });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error uploading image.",
//       error: error.message,
//     });
//   }
// };

// // Fetch student ID list
// const getStudentIdList = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const studentList = await studentMoreInfo.findOne({ studentID: id });

//     if (!studentList) {
//       return res.status(404).json({
//         success: false,
//         message: "Student ID not found.",
//       });
//     }

//     res.json({
//       success: true,
//       name: studentList.name,
//       roll: studentList.rollNo,
//     });
//   } catch (error) {
//     console.error("Error fetching student list:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching student list.",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   createProfileInfo,
//   getProfileInfo,
//   getProfileImage,
//   getStudentInfo,
//   getStudentIdList,
// };







// const studentModel = require("../Models/studentmodel");
// const studentMoreInfo = require("../Models/studentMoreInfo");

// // Fetch profile info
// const getProfileInfo = async (req, res) => {
//   const { id } = req.params;
//   console.log("Fetching profile for student ID:", id);

//   try {
//     const moreInfo = await studentMoreInfo.findOne({ studentID: id });
//     if (!moreInfo) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile info not found in the database.",
//       });
//     }

//     // Fallback image if none is set
//     const imageWithFallback =
//       moreInfo.image || `${process.env.BACKEND_URL}/images/default_image.jpg`;

//     res.status(200).json({
//       success: true,
//       moreInfo: {
//         ...moreInfo.toObject(),
//         image: imageWithFallback,
//       },
//     });
//   } catch (error) {
//     console.error("Error in getProfileInfo:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching profile info from the database.",
//       error: error.message,
//     });
//   }
// };

// // Create or update profile info
// const createProfileInfo = async (req, res) => {
//   console.log("Incoming Request Body:", req.body);
//   const { id } = req.params;

//   const profileData = { studentID: id, ...req.body };
//   try {
//     let profile = await studentMoreInfo.findOne({ studentID: id });

//     if (profile) {
//       profile = await studentMoreInfo.findOneAndUpdate(
//         { studentID: id },
//         profileData,
//         { new: true }
//       );
//     } else {
//       profile = await studentMoreInfo.create(profileData);
//     }

//     console.log("Profile saved successfully:", profile);
//     res.json({
//       success: true,
//       message: "Profile info saved successfully.",
//       profile,
//     });
//   } catch (error) {
//     console.error("Error saving profile:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error saving profile to the database.",
//       error: error.message,
//     });
//   }
// };

// // Fetch basic student info
// const getStudentInfo = async (req, res) => {
//   const { id } = req.params;
//   console.log("id in getStudentInfo", id);

//   try {
//     const student = await studentModel.findById(id);
//     if (!student) {
//       return res.status(404).json({ success: false, message: "Student not found" });
//     }

//     res.status(200).json({
//       success: true,
//       name: student.name,
//       email: student.email,
//       contact: student.contact,
//     });
//   } catch (error) {
//     console.error("Error fetching student:", error);
//     res.status(500).json({ success: false, message: "Error fetching student data." });
//   }
// };

// // Upload profile image to Cloudinary
// const getProfileImage = async (req, res) => {
//   const { id } = req.params;
//     console.log("Params ID:", req.params.id);
//     console.log("File received:", req.file);

//   console.log("Uploading image for student ID:", id);

//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded.",
//       });
//     }

//     const imageUrl = req.file.path; // Cloudinary URL
//     console.log("Cloudinary image URL:", imageUrl);

//     const updatedProfile = await studentMoreInfo.findOneAndUpdate(
//       { studentID: id },
//       { image: imageUrl },
//       { new: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({
//         success: false,
//         message: "Student profile not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Image uploaded successfully.",
//       image: imageUrl,
//       profile: updatedProfile,
//     });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error uploading image.",
//       error: error.message,
//     });
//   }
// };

// // Fetch student ID list
// const getStudentIdList = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const studentList = await studentMoreInfo.findOne({ studentID: id });

//     if (!studentList) {
//       return res.status(404).json({
//         success: false,
//         message: "Student ID not found.",
//       });
//     }

//     res.json({
//       success: true,
//       name: studentList.name,
//       roll: studentList.rollNo,
//     });
//   } catch (error) {
//     console.error("Error fetching student list:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching student list.",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   createProfileInfo,
//   getProfileInfo,
//   getProfileImage,
//   getStudentInfo,
//   getStudentIdList,
// };



















// // Controllers/profileController.js
// const studentModel = require("../Models/studentmodel");
// const studentMoreInfo = require("../Models/studentMoreInfo");
// const cloudinary = require("../config/cloudinary");
// const streamifier = require("streamifier");

// // helper: upload a buffer to Cloudinary
// const uploadBufferToCloudinary = (buffer, folder = "profile_images") =>
//   new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder, resource_type: "image" },
//       (err, result) => (err ? reject(err) : resolve(result))
//     );
//     streamifier.createReadStream(buffer).pipe(stream);
//   });

// // GET /api/Profile/:id
// const getProfileInfo = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const moreInfo = await studentMoreInfo.findOne({ studentID: id });
//     if (!moreInfo) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile info not found in the database.",
//       });
//     }

//     // Provide fallback image (served from /public/images in your backend)
//     const fallbackImage = `${process.env.BACKEND_URL || ""}/images/default_image.jpg`;
//     const imageWithFallback = moreInfo.image || fallbackImage;

//     return res.status(200).json({
//       success: true,
//       moreInfo: { ...moreInfo.toObject(), image: imageWithFallback },
//     });
//   } catch (error) {
//     console.error("Error in getProfileInfo:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching profile info from the database.",
//       error: error.message,
//     });
//   }
// };

// // POST /api/Profile/:id
// const createProfileInfo = async (req, res) => {
//   const { id } = req.params;
//   const profileData = { studentID: id, ...req.body };
//   try {
//     const profile =
//       (await studentMoreInfo.findOneAndUpdate({ studentID: id }, profileData, {
//         new: true,
//       })) || (await studentMoreInfo.create(profileData));

//     return res.json({
//       success: true,
//       message: "Profile info saved successfully.",
//       profile,
//     });
//   } catch (error) {
//     console.error("Error saving profile:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error saving profile to the database.",
//       error: error.message,
//     });
//   }
// };

// // GET /api/student/:id
// const getStudentInfo = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const student = await studentModel.findById(id);
//     if (!student) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Student not found" });
//     }
//     return res.status(200).json({
//       success: true,
//       name: student.name,
//       email: student.email,
//       contact: student.contact,
//     });
//   } catch (error) {
//     console.error("Error fetching student:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error fetching student data." });
//   }
// };

// // POST /api/Profile/:id/uploadImage  (upload.single('image'))
// const getProfileImage = async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (!req.file || !req.file.buffer) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded.",
//       });
//     }

//     // 1) Upload the buffer directly to Cloudinary
//     const result = await uploadBufferToCloudinary(req.file.buffer, "profile_images");
//     const imageUrl = result.secure_url;

//     // 2) Save URL in DB
//     const updatedProfile = await studentMoreInfo.findOneAndUpdate(
//       { studentID: id },
//       { image: imageUrl },
//       { new: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({
//         success: false,
//         message: "Student profile not found.",
//       });
//     }

//     return res.json({ success: true, image: imageUrl, profile: updatedProfile });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error uploading image.",
//       error: error.message,
//     });
//   }
// };

// // GET /api/student/idList/:id
// const getStudentIdList = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const studentList = await studentMoreInfo.findOne({ studentID: id });

//     if (!studentList) {
//       return res.status(404).json({
//         success: false,
//         message: "Student ID not found.",
//       });
//     }

//     return res.json({
//       success: true,
//       name: studentList.name,
//       roll: studentList.rollNo,
//     });
//   } catch (error) {
//     console.error("Error fetching student list:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching student list.",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   createProfileInfo,
//   getProfileInfo,
//   getProfileImage,
//   getStudentInfo,
//   getStudentIdList,
// };






const studentModel=require("../Models/studentmodel")
const studentMoreInfo=require("../Models/studentMoreInfo")

  const getProfileInfo = async (req, res) => {
    const { id } = req.params;
    console.log("Fetching profile for student ID:", id);
  
    try {
      const moreInfo = await studentMoreInfo.findOne({ studentID: id });
      if (!moreInfo) {
        return res.status(404).json({
          success: false,
          message: "Profile info not found in the database.",
        });
      }
  
      res.status(200).json({ success: true, moreInfo });
    } catch (error) {
      console.error("Error in getProfileInfo:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching profile info from the database.",
        error: error.message,
      });
    }
  };
  
  const createProfileInfo = async (req, res) => {
    console.log("Incoming Request Body:", req.body);
    const { id } = req.params;

    const profileData = { studentID: id, ...req.body };
    try {
      let profile = await studentMoreInfo.findOne({ studentID: id });
  
      if (profile) {
        profile = await studentMoreInfo.findOneAndUpdate({ studentID: id }, profileData, { new: true });
  
      } else {
        profile = await studentMoreInfo.create(profileData);
        await profile.save();
      }
  
      console.log("Profile saved successfully:", profile);
      res.json({
        success: true,
        message: "Profile info saved successfully.",
        profile,
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({
        success: false,
        message: "Error saving profile to the database.",
        error: error.message,
      });
    }
  };
  
  const getStudentInfo = async (req, res) => {
    const { id } = req.params;
  console.log("id in getStudentInfo",id)
    try {
      const student = await studentModel.findById(id);
      if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
  console.log("student in getStudentInfo",getStudentInfo)
      res.status(200).json({
        success: true,
        name: student.name,
        email: student.email,
        contact: student.contact,
      });
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ success: false, message: "Error fetching student data." });
    }
  };


  const getProfileImage = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id in image", id);
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded.",
        });
      }
  
      const imagePath = `/uploads/${req.file.filename}`;
      console.log("imagePath", imagePath)
      const updatedProfile = await studentMoreInfo.findOneAndUpdate(
        { studentID: id },
        { image: imagePath },
        { new: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({
          success: false,
          message: "Student profile not found.",
        });
      }
  
      res.json({ success: true, image: imagePath });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        success: false,
        message: "Error uploading image.",
        error: error.message,
      });
    }
  };
  
  const getStudentIdList = async (req, res) => {
    try {
      const { id } = req.params;
      const studentList = await studentMoreInfo.findOne({ studentID: id });
  
      if (!studentList) {
        return res.status(404).json({
          success: false,
          message: "Student ID not found.",
        });
      }
  
      res.json({
        success: true,
        name: studentList.name,
        roll: studentList.rollNo,
      });
    } catch (error) {
      console.error("Error fetching student list:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching student list.",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    createProfileInfo,
    getProfileInfo,
    getProfileImage,
    getStudentInfo,
    getStudentIdList,
  };
  