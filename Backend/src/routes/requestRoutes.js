const express = require("express");
const requests = require("../controllers/requestController");
const router = express.Router();

router.post('/createRequest', requests.createRequest);
router.get('/getAllRequests',requests.getAllRequests);
router.delete('/deleteRequest/:id',requests.deleteRequest);
router.patch('/updateRequest/:id',requests.updateRequest);
router.get('/requests/:id',requests.getRequestById)


module.exports = router;



