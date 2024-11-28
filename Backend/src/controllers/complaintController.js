const Complaint = require('../models/Complaint');

exports.createComplaint = async (req,res)=>{
  try {
      const{complainerName, complaintName, description, wing, unit, priority,status }= req.body;
      const user = await Complaint.create({
        complainerName,
        complaintName,
        description,
        wing,
        unit,
        priority,
        status
      });
      if (user) {
          res.json({
              success: true,
              message: "record has been inserted",
          });
      } else {
          res.json({
              success: false,
              message: "something wrong",
          });
      }
      console.log(user)
  } catch (error) {
    console.log(error);
  }
}
  

// Get all complaints
exports.getAllComplaints = async(req,res)=>{
  try {
      const user = await Complaint.find();
      if(user.length>0){
          res.json({
              success: true,
              records: user,
          });
      }else{
          res.json({
              success: false,
              records: user,
          });
      }
  } catch (error) {
      console.log(error);
  }
}

// Update complaint status
exports.updateComplaint = async(req,res)=>{
  try {
    const {id} = req.params;
    const {complainerName, complaintName, description, wing, unit, priority,status } = req.body;
 
   
    const user = await Complaint.findByIdAndUpdate(
      {
        _id: id,
      },
      {
      
        complainerName,
        complaintName,
        description,
        wing,
        unit,
        priority,
        status
      }
    );
    if (user) {
     
      res.json({
        success: true,
        message: "record has been updated",
        data:user
      });
    } else {
      res.json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
     console.log(error)
  }
 }

// Delete a complaint
exports.deleteComplaint = async (req, res) => {
  try {
    //const id =req.params.id;
    const { id } = req.params;
    // const user = await Complaint.findByIdAndDelete({_id:id})
    const user = await Complaint.findByIdAndDelete(id);

    if (user) {
      res.json({
        success: true,
        message: "Complaint deleted",
      });
    } else {
      res.json({
        success: false,
        message: "Complaint not deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

///getComplaintById data///
exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Complaint.findById(id);
    if (user) {
      res.json({
        success: true,
        record: user,
      });
    } else {
      res.json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
