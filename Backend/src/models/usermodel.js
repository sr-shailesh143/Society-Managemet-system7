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
    Country:{
        type:String,
        required:true,
    },
    State:{
       type:String,
       required:true
    },
    City:{
       type:String,
       required:true
    },
    select_society:{
            type: mongoose.Schema.Types.ObjectId, 
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
