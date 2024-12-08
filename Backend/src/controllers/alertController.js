const Alert = require('../models/alertModel');

// Create a new alert
exports.createAlert = async (req, res) => {
    try {
      const { alertType, description} = req.body;
  
    const alert = new Alert({
        alertType,
        description,
    });
  
      await alert.save();
      res.status(201).json({ success: true, data: alert });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Get all alerts
exports.getAllAlerts = async(req,res)=>{
    try {
        const alerts = await Alert.find();
        if(alerts.length>0){
            res.json({
                success: true,
                records: alerts,
            });
        }else{
            res.json({
                success: false,
                records: alerts,
            });
        }
    } catch (error) {
       
    }
  }

// Get an alert by ID
exports.getAlertById = async (req, res) => {
    try {
      const { id } = req.params;
      const alert = await Alert.findById(id);
      if (alert) {
        res.json({
          success: true,
          record: alert,
        });
      } else {
        res.json({
          success: false,
          message: "alert not found",
        });
      }
    } catch (error) {
    }
  };

// Update an alert by ID
exports.updateAlert = async(req,res)=>{
    try {
      const {id} = req.params;
      const {alertType, description } = req.body;
   
        const alert = await Alert.findByIdAndUpdate(
        {
          _id: id,
        },
        {
            alertType,
            description,
            
        }
      );
      if (alert) {
       
        res.json({
          success: true,
          message: "record has been updated",
        });
      } else {
        res.json({
          success: false,
          message: "alert not found",
        });
      }
    } catch (error) {
    }
   }
  

// Delete an alert by ID
exports.deleteAlert = async (req, res) => {
    try {
      //const id =req.params.id;
      const { id } = req.params;
      // const alert = await Alert.findByIdAndDelete({_id:id})
      const alert = await Alert.findByIdAndDelete(id);
  
      if (alert) {
        res.json({
          success: true,
          message: "Alert deleted successfully",
        });
      } else {
        res.json({
          success: false,
          message: "Alert not deleted",
        });
      }
    } catch (error) {
    }
  };
