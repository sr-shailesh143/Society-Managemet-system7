const { Schema, model } = require("mongoose");

const Societyschema= new Schema({
    Society_Name :{
       type:String,
       required:true
    },
    Society_Address:{
        type:String,
        required:true
    },
    Country_Name:{
    type:String,
    required:true
    },
    State_Name:{
        type:String,
        required:true
    },
    City_Name:{
        type:String,
        required:true
    },
    ZipCode_Number:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Society=model("Society",Societyschema)
module.exports=Society;