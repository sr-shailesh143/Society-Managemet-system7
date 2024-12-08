const Visitor = require('../models/TrvisitorModel');

// Create a new visitor
exports.createVisitor = async (req, res) => {
  try {
    const { visitorName, phoneNumber, wing, unit, date, time } = req.body;

    const visitor = new Visitor({
      visitorName,
      phoneNumber,
      wing,
      unit,
      date,
      time,
    });

    await visitor.save();
    res.status(201).json({ message: 'Visitor added successfully', visitor });
  } catch (error) {
    res.status(400).json({ message: 'Error adding visitor', error });
  }
};

// Get all visitors
exports.getAllVisitors = async(req,res)=>{
    try {
        const visitors = await Visitor.find();
        if(visitors.length>0){
            res.json({
                success: true,
                records: visitors,
            });
        }else{
            res.json({
                success: false,
                records: "visitors not found",
            });
        }
    } catch (error) {
    }
  }
// Get a single visitor by ID
exports.getVisitorById = async (req, res) => {
    try {
      const { id } = req.params;
      const visitors = await Visitor.findById(id);
      if (visitors) {
        res.json({
          success: true,
          record: visitors,
        });
      } else {
        res.json({
          success: false,
          message: "visitors not found",
        });
      }
    } catch (error) {
    }
  };

// Update a visitor by ID
exports.updateVisitor = async(req,res)=>{
    try {
      const {id} = req.params;
      const {visitorName, phoneNumber, wing, unit, date, time } = req.body;
   
        const visitor = await Visitor.findByIdAndUpdate(
        {
          _id: id,
        },
        {
            visitorName,
            phoneNumber,
            wing, 
            unit,
            date,
            date
        }
      );
      if (visitor) {
       
        res.json({
          success: true,
          message: "visitor updated successfully",
        });
      } else {
        res.json({
          success: false,
          message: "Error updating visitor",
        });
      }
    } catch (error) {
    }
   }

// Delete a visitor by ID
exports.deleteVisitor = async (req, res) => {
    try {
      //const id =req.params.id;
      const { id } = req.params;
      // const visitor = await Visitor.findByIdAndDelete({_id:id})
      const visitor = await Visitor.findByIdAndDelete(id);
  
      if (visitor) {
        res.json({
          success: true,
          message: "visitor deleted successfully",
        });
      } else {
        res.json({
          success: false,
          message: "visitor not found",
        });
      }
    } catch (error) {
    }
  };

