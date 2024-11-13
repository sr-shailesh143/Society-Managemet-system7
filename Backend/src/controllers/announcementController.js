const Announcement = require('../models/announcementModel');

// Create a new announcement
exports.createAnnouncement = async (req,res)=>{
  try {
      const{  title, description, announcementDate, announcementTime  }= req.body;
      const announcement = await Announcement.create({
        title,
        description,
        announcementDate,
        announcementTime
      });
      if (announcement) {
          res.json({
              success: true,
              message: "Announcement created successfully",
          });
      } else {
          res.json({
              success: false,
              message: "Error creating Announcement",
          });
      }
  } catch (error) {
    console.log(error);
  }
}

// // Get all announcements
exports.getAllAnnouncements = async(req,res)=>{
  try {
      const announcements = await Announcement.find();
      if(announcements.length>0){
          res.json({
              success: true,
              records: announcements,
          });
      }else{
          res.json({
              success: false,
              records: "facilities not found",
          });
      }
  } catch (error) {
      console.log(error);
  }
}

// Get a single announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const announcements = await Announcement.findById(id);
    if (announcements) {
      res.json({
        success: true,
        record: announcements,
      });
    } else {
      res.json({
        success: false,
        message: "Announcement not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Update an announcement by ID
exports.updateAnnouncement = async(req,res)=>{
  try {
    const {id} = req.params;
    const {title, description, announcementDate, announcementTime } = req.body;
 
      const announcements = await Announcement.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title,
        description,
        announcementDate,
        announcementTime
      }
    );
    if (announcements) {
     
      res.json({
        success: true,
        message: "Announcement updated successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Announcement not found",
      });
    }
  } catch (error) {
     console.log(error)
  }
 }

// Delete an announcement by ID
exports.deleteAnnouncement = async (req, res) => {
  try {
    //const id =req.params.id;
    const { id } = req.params;
    // const announcements = await Announcement.findByIdAndDelete({_id:id})
    const announcements = await Announcement.findByIdAndDelete(id);

    if (announcements) {
      res.json({
        success: true,
        message: "Announcement deleted successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Announcement not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};