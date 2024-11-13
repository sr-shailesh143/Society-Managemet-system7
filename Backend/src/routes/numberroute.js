const NumberController=require("../controllers/numbercontroller")
const router=require("express").Router();
//create number 
router.post("/createnumber",NumberController.CreateNumber)
router.get("/viewnumber",NumberController.Viewnumber)
router.get("/number/:id",NumberController.GetById)
router.delete("/number/:id",NumberController.DeleteNumber)
router.patch("/number/:id",NumberController.UpdateNumber)
module.exports=router;