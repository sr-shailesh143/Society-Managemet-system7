const NumberController=require("../controllers/numbercontroller")
const router=require("express").Router();
//create number 
router.post("/createnumber",NumberController.CreateNumber)
router.get("/viewnumber",NumberController.Viewnumber)
router.get("/GetByIdnumber/:id",NumberController.GetById)
router.delete("/DeleteNumber/:id",NumberController.DeleteNumber)
router.patch("/UpdateNumber/:id",NumberController.UpdateNumber)
module.exports=router;