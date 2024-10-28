const SocietyController=require("../controllers/societycontroller")
const router=require("express").Router();
router.post("/addSociety",SocietyController.AddSociety)
router.get("/viewSociety",SocietyController.GetSociety)
module.exports=router;