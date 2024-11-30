const SecurityProtocol = require('../models/securityProtocolsModel');

// Create a new Security Protocol
exports.createSecurityProtocol = async (req, res) => {
  try {
    const { title, description} = req.body;

   
    const newProtocol = new SecurityProtocol({
      title,
      description,
      // date: date || undefined, 
      // time: time || undefined   
    });

    await newProtocol.save();
    res.status(201).json({ success: true, data: newProtocol });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Security Protocols
exports.getAllSecurityProtocols = async(req,res)=>{
  try {
      const protocols = await SecurityProtocol.find();
      if(protocols.length>0){
          res.json({
              success: true,
              records: protocols,
          });
      }else{
          res.json({
              success: false,
              records: protocols,
          });
      }
  } catch (error) {
      console.log(error);
  }
}

// Get a single Security Protocol by ID
exports.getSecurityProtocolById = async (req, res) => {
  try {
    const { id } = req.params;
    const protocol = await SecurityProtocol.findById(id);
    if (protocol) {
      res.json({
        success: true,
        record: protocol,
      });
    } else {
      res.json({
        success: false,
        message: "Protocol not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Update a Security Protocol by ID
exports.updateSecurityProtocol = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    const updatedProtocol = await SecurityProtocol.findByIdAndUpdate(
      req.params.id,
      { title, description, date, time },
      { new: true, runValidators: true }
    );

    if (!updatedProtocol) {
      return res.status(404).json({ success: false, message: 'Protocol not found' });
    }

    res.status(200).json({ success: true, data: updatedProtocol });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Security Protocol by ID
exports.deleteSecurityProtocol = async (req, res) => {
  try {
    //const id =req.params.id;
    const { id } = req.params;
    // const protocol = await SecurityProtocol.findByIdAndDelete({_id:id})
    const protocol = await SecurityProtocol.findByIdAndDelete(id);

    if (protocol) {
      res.json({
        success: true,
        message: "Protocol deleted successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Protocol not deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
