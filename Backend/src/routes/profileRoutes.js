const express = require("express");
const router = express.Router();
const Clupload = require("../utils/Clupload");
const { createProfile, getProfiles, updateProfile } = require("../controllers/profileController");

router.post("/createProfile", Clupload.single("image"), createProfile);
router.get("/getProfiles", getProfiles);
router.patch("/updateProfile/:id", Clupload.single("image"), updateProfile); 
module.exports = router;
