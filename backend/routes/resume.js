const express = require("express");
const multer = require("multer");
const extractText = require("../utils/extractText");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("Uploaded File:", req.file);

    const text = await extractText(req.file.path);

    console.log("Extracted Text:");
    console.log(text);

    res.json({
      success: true,
      filename: req.file.filename,
      originalname: req.file.originalname,
      extractedText: text,
    });
  } catch (err) {
    console.error("ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;