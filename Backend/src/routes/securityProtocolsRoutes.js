const express = require('express');
const router = express.Router();
const securityProtocols = require('../controllers/securityProtocolsController');

// Routes for CRUD operations
router.post('/createSecurityProtocol', securityProtocols.createSecurityProtocol);          
router.get('/getAllSecurityProtocols', securityProtocols.getAllSecurityProtocols);             
router.get('/getSecurityProtocolById/:id', securityProtocols.getSecurityProtocolById);          
router.patch('/updateSecurityProtocol/:id', securityProtocols.updateSecurityProtocol);    
router.delete('/deleteSecurityProtocol/:id', securityProtocols.deleteSecurityProtocol); 

module.exports = router;
