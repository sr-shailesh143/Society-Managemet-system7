const OwnerController = require("../controllers/OwnerController");
const TenateController = require("../controllers/TenateController");
const router = require("express").Router();
const upload = require("../utils/Clupload");
//add owner
router.post(
  "/addowner",
  upload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "rentAgreement", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  OwnerController.CreateOwnerData
);
//show owner
router.get("/viewowner", OwnerController.GetAllOwners);

//update owner
router.patch(
  "/owner/:id",
  upload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "rentAgreement", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  OwnerController.updateOwner
);

//add tenant
router.post(
  "/addtenante",
  upload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "rentAgreement", maxCount: 1 },
    { name: "tenantImage", maxCount: 1 },
  ]),
  TenateController.addTenantData
);

//show tenante
router.get("/viewtenante", TenateController.getAllTenants);


//update tenant
router.put(
  "/tenante/:id",
  upload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "rentAgreement", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  TenateController.updateTenantData
);


//get by id resident
router.get("/resident/:id", OwnerController.getOwnerById);
// get all resident
router.get("/allresident", OwnerController.GetAllOwners);
//delete resident
router.delete("/resident/:id", OwnerController.deleteOwnerById);

//blank field
router.put("/update/:id",OwnerController.getOwnerById)
//total occupied unit 
router.get('/unit/total-occupied-units',OwnerController.getTotalOccupiedUnits)


module.exports = router;
