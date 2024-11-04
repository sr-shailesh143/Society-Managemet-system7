const { Schema, model, default: mongoose } = require("mongoose");



const userSchema=new Schema({
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    SurName:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone_Number:{
       type:String,
       required:true,
       unique:true
    },
    Country_Name:{
        type:String,
        required:true,
    },
    State_Name:{
       type:String,
       required:true
    },
    City_Name:{
       type:String,
       required:true
    },
    select_society:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: 'Society' 
        
    },
    password:{
        type:String,
        required:true
    },
    
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'admin' 
    },
    otp:{
        type:String,
    },
    otpExpiration:{
        type:Date,
        default:Date.now,
        get:(otpExpiration)=>otpExpiration.getTime(),
        set:(otpExpiration)=>new Date(otpExpiration)
    }
    
},
     {timestamps:true})

  const User=model("User",userSchema)
  module.exports=User;
