const multer = require("multer");
const path = require("path");

// STORAGE CORRECT
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// EXPORT UPLOAD
const upload = multer({ storage });

module.exports = upload;