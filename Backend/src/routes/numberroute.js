const NumberController=require("../controllers/numbercontroller")
const router=require("express").Router();
//create number 
router.post("/createnumber",NumberController.CreateNumber)
router.get("/viewnumber",NumberController.Viewnumber)
router.get("/:id",NumberController.GetById)
router.delete("/:id",NumberController.DeleteNumber)
router.patch("/:id",NumberController.UpdateNumber)
module.exports=router;