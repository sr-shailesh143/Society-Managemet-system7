const ImpNumber = require("../models/numbermodel");


exports.CreateNumber = async (req, res) => {
    try {
        const { Name, Number, Work } = req.body;
    
        const findPhone= await ImpNumber.findOne({Number: Number})
        if(findPhone){
            return res.status(400).json({
                success:false,
                message:"Phone Number Already Exist in our Database..."
            })
        }
        if (!Name || ! Number || !Work) {
            return res.status(400).json({
                success: false,
                message: "All fields are required 😔"
            });
        }

        // Validate the phone number format
        // const phoneRegex = /^\[6-9]\d{9}$/; 
        // if (!phoneRegex.test(Number)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid phone number format"
        //     });
        // }

        const numbersave = new ImpNumber({
            Name,
             Number,
            Work
        });

        await numbersave.save();

        // Confirm successful insertion
        return res.status(200).json({
            success: true,
            message: "Important Number Created 👍"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error 😔"
        });
    }
};
//get all Number 
exports.Viewnumber=async(req,res)=>{
    try {
        const find=await ImpNumber.find()
        if(!find){
            return res.status(400).json({
                success:true,
                message:"Data not found 🤷‍♂️"
            })
        }
        return res.status(200).json({
            success:true,
            ImpNumber:find
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error 😔"
        });
    }
}
//get By id 
exports.GetById =async(req,res)=>{
    try {
        const find=await ImpNumber.findById(req.params.id)
        if(!find){
            return res.status(400).json({
                success:true,
                message:"Data not found 🤷‍♂️"
            })
        }
        return res.status(200).json({
            success:true,
            ImpNumber:find
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error 😔"
        });
    }
}
//delete important number 
exports.DeleteNumber =async(req,res)=>{
    try {
        const find=await ImpNumber.findByIdAndDelete(req.params.id)
        if(!find){
            return res.status(400).json({
                success:true,
                message:"Data not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Number Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error 😔"
        });
    }
}
//update Number
exports.UpdateNumber=async(req,res)=>{
    try {
        const { Name, Number, Work } = req.body;
    
       
        // Check if required fields are present
        if (!Name || !Number || !Work) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate the phone number format
        // const phoneRegex = /^\[6-9]\d{9}$/; 
        // if (!phoneRegex.test(Number)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid phone number format"
        //     });
        // }

        // Create and save the new number
       const updatedata=await ImpNumber.findByIdAndUpdate(req.params.id,req.body,{new:true})
  
       if(!updatedata){
           return res.status(400).json({
            success:false,
            message:"Something went Wrong 🤨"
           })
       }
        // Confirm successful insertion
        return res.status(200).json({
            success: true,
            message: "Number Updated 👌"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error 😔"
        });
    }
}