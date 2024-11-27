const { Schema, model } = require("mongoose");

const tenanteschema= new Schema({
    Owner_Fullname: {
        type: String,
        required: true,
      },
      Owner_Phone: {
        type: String,
        required: true,
      },
      Owner_Address: {
        type: String,
        required: true,
      },
    profile:{
        type:String,
        required: true 
    },
    Fullname:{
        type:String,
        required: true
    },
    Phonenumber:{
        type:String,
        required: true
    },
    Emailaddress:{
        type:String,
        required: true
    },
    Age:{
        type:Number,
        required: true
    },
    Gender:{
        type:String,
        required: true,
        enum: ['Male', 'Female', 'other'],
        default: null
    },
    Wing:{
        type:String,
        required: true
    },
    Unit:{
        type:Number,
        required: true
    },
    Relation:{
        type:String,
        required: true
    },
    Aadharfront:{
        type:String,
        
       
    },
    Aadharback:{
        type:String,
        
    },
    Addressproof:{
        type:String,
        
    },
    Rent_Agreement:{
        type:String,
        
    },
    Member_Counting: [{
        Full_name: { type: String, required: true },
        Phone_number: { type: String, required: true },
        Email_address: { type: String, required: true },
        Age: { type: Number, required: true },
        Gender: { type: String, required: true },
        Relation: { type: String, required: true }
    }],
    Vehicle_Counting: [{
        vehicle_type: { type: String, required: true },
        vehicle_name: { type: String, required: true },
        vehicle_number: { type: String, required: true }
    }],
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'resident' 
    },
   password: {  
        type: String,
        required: true
    },
    Resident_status:{
        type:String,
        default:"Tenante",
    },
    UnitStatus:{
        type:String,
        default:"Occupied"
    }

},{timestamps:true})


const Tenante = model("Tenante", tenanteschema);
module.exports = Tenante;