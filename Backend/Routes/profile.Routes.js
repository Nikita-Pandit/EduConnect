const express=require("express")
const router=express.Router()
const {createProfileInfo} = require('../Controllers/profileController')

router.post('/Profile',createProfileInfo)
module.exports = router