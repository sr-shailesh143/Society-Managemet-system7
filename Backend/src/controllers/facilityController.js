const Facility = require('../models/facilityModel');
exports.createFacility = async (req,res)=>{
    try {
        const{  facilityName, description, scheduleServiceDate, remindBefore  }= req.body;
        const newfacility = await Facility.create({
            facilityName,
            description,
            scheduleServiceDate, 
            remindBefore
        });
        if (newfacility) {
            res.json({
                success: true,
                message: "Facility created successfully",
            });
        } else {
            res.json({
                success: false,
                message: "Error creating facility",
            });
        }
    } catch (error) {
    }
  }

  // Get all facilities
exports.getAllFacilities = async(req,res)=>{
    try {
        const facilities = await Facility.find();
        if(facilities.length>0){
            res.json({
                success: true,
                records: facilities,
            });
        }else{
            res.json({
                success: false,
                records: "facilities not found",
            });
        }
    } catch (error) {
    }
  }

// Get a single facility by ID
exports.getFacilityById = async (req, res) => {
    try {
      const { id } = req.params;
      const facilities = await Facility.findById(id);
      if (facilities) {
        res.json({
          success: true,
          record: facilities,
        });
      } else {
        res.json({
          success: false,
          message: "facilities not found",
        });
      }
    } catch (error) {
    }
  };

// Update a facility by ID
exports.updateFacility = async(req,res)=>{
    try {
      const {id} = req.params;
      const {facilityName, description, scheduleServiceDate, remindBefore  } = req.body;
   
        const facilities = await Facility.findByIdAndUpdate(
        {
          _id: id,
        },
        {
            facilityName,
            description,
            scheduleServiceDate, 
            remindBefore
        }
      );
      if (facilities) {
       
        res.json({
          success: true,
          message: "Facility updated successfully",
        });
      } else {
        res.json({
          success: false,
          message: "Error updating facility",
        });
      }
    } catch (error) {
    }
   }

// Delete a facility by ID
exports.deleteFacility = async (req, res) => {
    try {
      //const id =req.params.id;
      const { id } = req.params;
      // const facility = await Facility.findByIdAndDelete({_id:id})
      const facilities = await Facility.findByIdAndDelete(id);
  
      if (facilities) {
        res.json({
          success: true,
          message: "Facility deleted successfully",
        });
      } else {
        res.json({
          success: false,
          message: "Facility not found",
        });
      }
    } catch (error) {
    }
  };