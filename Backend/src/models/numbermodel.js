const { Schema, model } = require("mongoose");

const numberSchema=new Schema({
    Name:{
        type:String,
        required:true
    },
    Number:{
        type:String,
        required:true
    },
    Work:{
        type:String,
        required:true
    }
})
const ImpNumber=model("ImpNumber",numberSchema)
module.exports=ImpNumber;