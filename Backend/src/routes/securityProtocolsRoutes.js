const express = require('express');
const router = express.Router();
const securityProtocols = require('../controllers/securityProtocolsController');

// Routes for CRUD operations
router.post('/', securityProtocols.createSecurityProtocol);          
router.get('/', securityProtocols.getAllSecurityProtocols);             
router.get('/:id', securityProtocols.getSecurityProtocolById);          
router.patch('/:id', securityProtocols.updateSecurityProtocol);    
router.delete('/:id', securityProtocols.deleteSecurityProtocol); 

module.exports = router;
