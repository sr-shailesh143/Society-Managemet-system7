const express = require('express');
const complaints = require('../controllers/complaintController');
const router = express.Router();

router.post('/createComplaint',complaints.createComplaint)
router.get('/getAllComplaints',complaints.getAllComplaints)
router.delete('/deleteComplaint/:id',complaints.deleteComplaint)
router.patch('/updateComplaint/:id',complaints.updateComplaint)
router.get('/complaints/:id',complaints.getComplaintById)


module.exports = router;
