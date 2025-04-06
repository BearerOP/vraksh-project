require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const referralRoutes = require("./routes/referralRoutes");
const branchRoutes = require("./routes/branchRoutes");

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
const allowedOrigins = process.env.ORIGINS;

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Requested Origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(allowedOrigins);
      
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Enable CORS
app.use(cors(corsOptions));

// CORS preflight
app.options('*', cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", referralRoutes);
app.use("/api", branchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Vraksh API!" });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.BASE_URL}`);
  });
}

module.exports = app; // For testing
