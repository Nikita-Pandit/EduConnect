const express=require("express")
const router=express.Router()
const {signupController} = require('../Controllers/signupController')

router.post('/SignUp',signupController)
module.exports = router