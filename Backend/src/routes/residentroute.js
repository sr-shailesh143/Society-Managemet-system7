const ResidentController=require("../controllers/residentcontroller")
const router=require("express").Router();
const upload=require("../utils/residentimages")
router.post("/addresident", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 }
]), ResidentController.addresidentData);
module.exports=router;