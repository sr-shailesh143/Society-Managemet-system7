// routes/incomeRoutes.js
const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

router.post('/createIncome', incomeController.createIncome);           // Create a new income entry
router.get('/getAllIncome', incomeController.getAllIncome);               // Get all income entries
router.get('/getIncomeById/:id', incomeController.getIncomeById);           // Get income entry by ID
router.patch('/updateIncome/:id', incomeController.updateIncome);     // Update income entry by ID
router.delete('/deleteIncome/:id', incomeController.deleteIncome);  // Delete income entry by ID

module.exports = router;
