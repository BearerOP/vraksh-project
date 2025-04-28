const express = require("express");
const router = express.Router();

const { scrapePage } = require("../controllers/scrapeController.js");

// Public routes
router.get("/scrape", scrapePage); // Scrape page



module.exports = router;