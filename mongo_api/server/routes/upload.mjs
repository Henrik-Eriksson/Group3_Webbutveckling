import express from "express";
import multer from "multer";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 'uploads/' is the directory where the images will be saved. Make sure this directory exists.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Save file with current date as prefix to avoid name collisions
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // Assuming you serve the 'uploads/' directory as static in Express

    // You can save the imageUrl to the database if needed

    res.json({ success: true, imageUrl: imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
