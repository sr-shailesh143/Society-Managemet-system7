const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the uploads directory path
// const uploadDir = path.join(__dirname, "../../uploads");
const uploadDir = path.join(__dirname, "../../public/uploads");


// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // You can set a folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb("Error: Only images (png, jpg, gif) and pdf files are allowed!");
        }
    },
});


module.exports = upload;