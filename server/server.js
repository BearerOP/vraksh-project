require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", referralRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Referral API" });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
}

module.exports = app; // For testing
