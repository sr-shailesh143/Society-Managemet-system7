const Note = require("../models/Note");

// Controller function to add a new note
exports.addNote = async (req,res)=>{
    try {
        const{ title, description, date }= req.body;
        const newNote = await Note.create({
            title,
            description,
            date 
        });
        if (newNote) {
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
    } catch (error) {
      console.log(error);
    }
  }


// Controller function to get all notes
exports.getAllNotes = async(req,res)=>{
    try {
        const notes = await Note.find();
        if(notes.length>0){
            res.json({
                success: true,
                records: notes,
            });
        }else{
            res.json({
                success: false,
                records: "notes not found",
            });
        }
    } catch (error) {
        console.log(error);
    }
  }

// Controller function to get a single note by ID
exports.getNoteById = async (req, res) => {
    try {
      const { id } = req.params;
      const notes = await Note.findById(id);
      if (notes) {
        res.json({
          success: true,
          record: notes,
        });
      } else {
        res.json({
          success: false,
          message: "Notes not found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

// Controller function to update a note by ID
exports.updateNote = async(req,res)=>{
    try {
      const {id} = req.params;
      const {title, description, date  } = req.body;
   
        const notes = await Note.findByIdAndUpdate(
        {
          _id: id,
        },
        {
            title,
            description,
            date 
        }
      );
      if (notes) {
       
        res.json({
          success: true,
          message: "record has been updated",
        });
      } else {
        res.json({
          success: false,
          message: "notes not found",
        });
      }
    } catch (error) {
       console.log(error)
    }
   }

// Controller function to delete a note by ID
exports.deleteNote = async (req, res) => {
    try {
      //const id =req.params.id;
      const { id } = req.params;
      // const notes = await Complaint.findByIdAndDelete({_id:id})
      const notes = await Note.findByIdAndDelete(id);
  
      if (notes) {
        res.json({
          success: true,
          message: "Note deleted",
        });
      } else {
        res.json({
          success: false,
          message: "Notes not deleted",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
