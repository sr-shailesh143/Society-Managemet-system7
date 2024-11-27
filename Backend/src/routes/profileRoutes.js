const express = require("express");
const router = express.Router();
const Clupload = require("../utils/Clupload");
const { createProfile, getProfiles, updateProfile } = require("../controllers/profileController");

router.post("/add", Clupload.single("image"), createProfile);
router.get("/all", getProfiles);
router.patch("/update/:id", Clupload.single("image"), updateProfile); 
module.exports = router;
