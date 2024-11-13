const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/ClexpenseController");
const upload = require("../utils/Clupload");

router.post("/create/expense", upload.single("bill"), expenseController.addExpense);
router.get("/get/expense", expenseController.getAllExpenses);
router.get("/expense/:id", expenseController.getExpenseById);
router.patch("/update/expense/:id", upload.single("bill"), expenseController.updateExpense);
router.delete("/delete/expense/:id", expenseController.deleteExpense);

module.exports = router;
