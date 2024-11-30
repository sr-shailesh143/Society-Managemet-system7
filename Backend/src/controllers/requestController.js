const Request = require("../models/Request");
const moment = require("moment");

exports.createRequest = async (req, res) => {
    try {
        const { requesterName, requestName, requestDate, wing, unit, priority, status,Description } = req.body;

        // Check if required fields are present
        if (!requesterName || !requestName || !requestDate) {
            return res.status(400).json({ 
                error: "Requester Name, Request Name, and Request Date are required." 
            });
        }

        // Parse requestDate using moment with DD/MM/YYYY format
        // const parsedDate = moment(requestDate, "DD-MM-YYYY", true);

        // Check if the date is valid
        // if (!parsedDate.isValid()) {
        //     return res.status(400).json({ error: "Invalid date format. Use 'DD/MM/YYYY'." });
        // }

        // Create a new request
        const newRequest = new Request({
            requesterName,
            requestName,
            requestDate,  
            wing,
            unit,
            priority,
            status,
            Description,
    
        });

        // Save to database
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        console.error("Error creating request:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all requests
exports.getAllRequests = async(req,res)=>{
    try {
        const user = await Request.find();
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

// Get a getRequestById 
exports.getRequestById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Request.findById(id);
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

// Update a request by ID
exports.updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { requesterName, requestName, requestDate, wing, unit, priority, status } = req.body;

       
        const updateData = {
            requesterName,
            requestName,
            wing,
            unit,
            priority,
            status,
            requestDate
        };

        // Find the request by ID and update it
        const updatedRequest = await Request.findByIdAndUpdate(id, updateData, { new: true });

        // Check if the request was found and updated
        if (!updatedRequest) {
            return res.status(404).json({ error: "Request not found." });
        }

        res.status(200).json(updatedRequest);
    } catch (error) {
        console.error("Error updating request:", error);
        res.status(500).json({ error: "An error occurred while updating the request." });
    }
};

// Delete a request by ID
exports.deleteRequest = async (req, res) => {
    try {
      //const id =req.params.id;
      const { id } = req.params;
      // const user = await Complaint.findByIdAndDelete({_id:id})
      const user = await Request.findByIdAndDelete(id);
  
      if (user) {
        res.json({
          success: true,
          message: "Request deleted",
        });
      } else {
        res.json({
          success: false,
          message: "Request not deleted",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
