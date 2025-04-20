
const { getSupervisorsController } = require("../Controllers/SupervisorsController"); // Ensure correct import
const express = require("express");
const router = express.Router();

router.get("/Supervisors", getSupervisorsController); // Use the correct function

module.exports = router;
