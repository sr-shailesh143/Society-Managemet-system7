require('dotenv').config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; 
const NODE_ENV = process.env.NODE_ENV;  

exports.generateToeken = (userId, res) => {
    const token = jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: "15d" }
    );

    res.cookie("society-auth", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
       sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", 
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}
