// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary")

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "profile_images",
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;




// // middlewares/upload.js
// const multer = require("multer");

// // Use in-memory buffer (works on Vercel)
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB (adjust if you want)
//   fileFilter: (req, file, cb) => {
//     const ok = /image\/(jpeg|jpg|png|webp)/.test(file.mimetype);
//     if (!ok) return cb(new Error("Only JPG/PNG/WEBP images are allowed"));
//     cb(null, true);
//   },
// });

// module.exports = upload;




const multer = require("multer");

// Store file in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpeg|jpg|png|webp)/.test(file.mimetype);
    if (!ok) return cb(new Error("Only JPG/PNG/WEBP images are allowed"));
    cb(null, true);
  },
});

module.exports = upload;
