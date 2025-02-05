const express = require("express");
const router = express.Router();
const { verifyEmailController } = require("../Controllers/verifyEmailController");

router.get("/verify",verifyEmailController);

module.exports = router;
