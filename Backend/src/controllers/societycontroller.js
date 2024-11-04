const Society = require("../models/societymodel")

//create society 
exports.createSociety = async (req,res)=>{
   try {
     const {Society_Name ,  Society_Address , Country_Name ,State_Name, City_Name, ZipCode_Number}=req.body
     if(!Society_Name || !Society_Address || !Country_Name || !State_Name || !City_Name || !ZipCode_Number)
     {
         return res.status(401).json({
             success:flase,
             message:"All field are required "
         })
     }
 
     const createsociety = new Society({
        Society_Name,
        Society_Address,
        Country_Name,
        State_Name,
        City_Name,
        ZipCode_Number
     })
     await createsociety.save();
      if(!createsociety){
         return res.status(400).json({
             success:false,
             message:"Something went wrong Please try Again 🤷‍♂️"
         })
      }
      return res.status(200).json({
         success:true,
         message:"Society Are Created successfully 👍" 
      })
   } catch (error) {
    console.log(error);
    
    return res.status(500).json({
        success:false,
        message:" We got Internal server error 😒"
    })
   }
}

//view  society 
exports.viewSociety= async(req,res)=>{
    try {
        const findSociety= await Society.find();
        if(!findSociety){
            return res.status(400).json({
                success:false,
                message:"No Society Found Hear 😒"
            })
        }
    
        return res.status(200).json({
            success:true,
            Society:findSociety
        })
    } catch (error) {
        console.log(error);
    
    return res.status(500).json({
        success:false,
        message:" We got Internal server error 😒"
    })
    }
}