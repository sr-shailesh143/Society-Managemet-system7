const cloudinary = require("cloudinary").v2;


require("dotenv").config();
require("./db");

 cloudinary.config({ 
     cloud_name: 'dy4ilxyei', 
     api_key: '669914382224398', 
     api_secret: 'H8GMLTg7QW6OzmVJK-_bQweRleY'
   });

module.exports = cloudinary;




