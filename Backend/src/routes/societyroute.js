const SocietyController=require("../controllers/societycontroller")
const router=require("express").Router();
router.post("/createSociety",SocietyController.createSociety)
router.get("/viewSociety",SocietyController.viewSociety)
module.exports=router;