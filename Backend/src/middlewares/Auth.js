const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

exports.auth = async (req, res, next) => {
  try {
    // Retrieve token from cookies or authorization header
    const token = req.cookies['society-auth'] || req.headers.authorization?.split(' ')[1];

    if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied: No token provided' });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token is invalid or has expired' });
  }
};

exports.IsUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized: User not identified" });
  }

  if (req.user.role_id === "user") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Access denied: You lack the required permissions" });
  }
};

exports.IsAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized: User not identified" });
  }

  if (req.user.role_id === "admin") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Access denied: Admin privileges required" });
  }
};


