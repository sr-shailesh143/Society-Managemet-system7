const cloudinary = require("cloudinary").v2;
const connectDB = require('./db');

require("dotenv").config();
connectDB();

 cloudinary.config({ 
     cloud_name: 'dy4ilxyei', 
     api_key: '669914382224398', 
     api_secret: 'H8GMLTg7QW6OzmVJK-_bQweRleY'
   });

module.exports = cloudinary;




