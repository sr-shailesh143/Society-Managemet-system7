const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/ClexpenseController");
const upload = require("../utils/Clupload");

router.post("/addExpense", upload.single("bill"), expenseController.addExpense);
router.get("/getAllExpenses", expenseController.getAllExpenses);
router.get("/expense/:id", expenseController.getExpenseById);
router.patch("/updateExpense/:id", upload.single("bill"), expenseController.updateExpense);
router.delete("/deleteExpense/:id", expenseController.deleteExpense);

module.exports = router;
