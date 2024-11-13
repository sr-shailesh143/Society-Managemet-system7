const express = require("express");
const requests = require("../controllers/requestController");
const router = express.Router();

router.post('/create/requests', requests.createRequest);
router.get('/get/requests',requests.getAllRequests);
router.delete('/delete/requests/:id',requests.deleteRequest);
router.patch('/update/requests/:id',requests.updateRequest);
router.get('requests/:id',requests.getRequestById)


module.exports = router;



