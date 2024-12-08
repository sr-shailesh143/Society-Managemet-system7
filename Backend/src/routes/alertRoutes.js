
const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/createAlert', alertController.createAlert);          
router.get('/getAllAlerts', alertController.getAllAlerts);             
router.get('/getAlertById/:id', alertController.getAlertById);           
router.patch('/updateAlert/:id', alertController.updateAlert);     
router.delete('/deleteAlert/:id', alertController.deleteAlert);  

module.exports = router;
