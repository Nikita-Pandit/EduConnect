const express = require('express');
const router = express.Router();
const {forgetPasswordController}=require("../Controllers/forgetPasswordController")
// router.post('/forgot-password', async (req, res) => {
//     // Your logic for handling the forget password functionality
//     res.status(200).json({ message: 'Forget password route working' });
// });
router.post("/forgot-password",forgetPasswordController)
module.exports = router;
