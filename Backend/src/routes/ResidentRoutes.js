const ResidentController = require("../controllers/OwnerController");
const router = require("express").Router();
const Reupload = require("../utils/Reupload");
//add owner
router.post(
  "/add",
  Reupload.fields([
    { name: "Aadharfront", maxCount: 1 },
    { name: "Aadharback", maxCount: 1 },
    { name: "Addressproof", maxCount: 1 },
    { name: "Rent_Agreement", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  ResidentController.addOwnerData
);
//show owner
router.get("/view", ResidentController.GetAllOwner);
