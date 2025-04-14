const express = require("express");
const router = express.Router();

const cloudinaryHandler = require("../controllers/cloudinaryController");

const { protect } = require("../middleware/auth");

router.post("/cloudinary-signature", protect, cloudinaryHandler);

module.exports = router;