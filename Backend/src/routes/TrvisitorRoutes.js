// routes/visitorRoutes.js
const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const { store } = require('../config/cloudinaryConfig');
// const upload = multer({ store });
const trvisitorController =require('../controllers/trvisitorController')



// Create visitor (with image upload)
router.post('/createVisitor', trvisitorController.createVisitor); 
// router.post('/', upload.single('TrvisitorImg'), trvisitorController.createVisitor);

// Get all visitors
router.get('/getAllVisitors', trvisitorController.getAllVisitors);

// Get a single visitor by ID
router.get('/getVisitorById/:id', trvisitorController.getVisitorById);

// Update visitor (with optional new image upload)
router.patch('/updateVisitor/:id', trvisitorController.updateVisitor);  
// router.patch('/:id', upload.single('visitorImg'), trvisitorController.updateVisitor);

// Delete visitor
router.delete('/deleteVisitor/:id', trvisitorController.deleteVisitor);

module.exports = router;



