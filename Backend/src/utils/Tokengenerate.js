require('dotenv').config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;  // Get JWT_SECRET from environment variables
const NODE_ENV = process.env.NODE_ENV;  // Get NODE_ENV from environment variables

exports.generateToeken = (userId, res) => {
    const token = jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: "15d" }
    );

    res.cookie("society-auth", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV !== "development"  // Adjust secure cookie settings
    });

    return token;
}
