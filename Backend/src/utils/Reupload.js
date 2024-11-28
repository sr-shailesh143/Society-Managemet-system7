const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // Unique filename
    }
});

// Initialize Multer with limits
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        // Check file type 
        const filetypes = /jpeg|jpg|png|gif|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!'); // wrong file
        }
    }
});


module.exports = upload;
