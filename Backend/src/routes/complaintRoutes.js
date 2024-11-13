const express = require('express');
const complaints = require('../controllers/complaintController');
const router = express.Router();

router.post('/create/complaints',complaints.createComplaint)
router.get('/get/complaints',complaints.getAllComplaints)
router.delete('/delete/complaints/:id',complaints.deleteComplaint)
router.patch('/update/complaints/:id',complaints.updateComplaint)
router.get('/complaints/:id',complaints.getComplaintById)


module.exports = router;
