const express = require("express");
const router = express.Router();
const Clupload = require("../utils/Clupload");
const { createProfile } = require("../controllers/profileController");

router.post("/", Clupload.single("image"), createProfile);

module.exports = router;
