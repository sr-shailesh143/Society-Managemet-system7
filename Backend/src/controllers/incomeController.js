const Income = require('../models/incomeModel');

// Create new income entry
exports.createIncome = async (req, res) => {
    try {
      const { title, date, dueDate, description, amount} = req.body;
  
    const income = new Income({
        title,
        date,
        dueDate,
        description,
        amount
    });
  
      await income.save();
      res.status(201).json({ success: true, data: income });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Get all income entries
exports.getAllIncome = async(req,res)=>{
    try {
        const incomes = await Income.find();
        if(incomes.length>0){
            res.json({
                success: true,
                records: incomes,
            });
        }else{
            res.json({
                success: false,
                records: incomes,
            });
        }
    } catch (error) {
        console.log(error);
    }
  }
// Get income entry by ID

exports.getIncomeById = async (req, res) => {
    try {
      const { id } = req.params;
      const income = await Income.findById(id);
      if (income) {
        res.json({
          success: true,
          record: income,
        });
      } else {
        res.json({
          success: false,
          message: "income not found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

// Update income entry by ID

exports.updateIncome = async(req,res)=>{
    try {
      const {id} = req.params;
      const { title, date, dueDate, description, amount } = req.body;
   
        const income = await Income.findByIdAndUpdate(
        {
          _id: id,
        },
        {
            title,
            date,
            dueDate,
            description,
            amount
            
        }
      );
      if (income) {
       
        res.json({
          success: true,
          message: "record has been updated",
        });
      } else {
        res.json({
          success: false,
          message: "income not found",
        });
      }
    } catch (error) {
       console.log(error)
    }
   }

// Delete income entry by ID

exports.deleteIncome = async (req, res) => {
    try {
      //const id =req.params.id;
      const { id } = req.params;
      // const income = await Income.findByIdAndDelete({_id:id})
      const income = await Income.findByIdAndDelete(id);
  
      if (income) {
        res.json({
          success: true,
          message: "income deleted successfully",
        });
      } else {
        res.json({
          success: false,
          message: "income not deleted",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };