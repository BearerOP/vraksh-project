const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false, // Not required for OAuth users
    trim: true,
    maxlength: [30, "Username cannot be more than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please add a valid email"],
  },
  authProvider: {
    type: String,
    enum: ["email", "google", "github"],
    default: "email",
  },
  providerId: {
    type: String, // Google/GitHub ID 
    default: null,
  },
  authKey: {
    type: String, // Magic link token
    default: null,
    select: false, // Hide from queries
  },
  authKeyExpire: {
    type: Date,
    default: null,
    select: false, // Hide from queries
  },
  referralCode: {
    type: String,
    unique: true,
    default: () => uuidv4().substring(0, 8), // Generate a unique referral code
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  referralCount: {
    type: Number,
    default: 0,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1740827218~exp=1740830818~hmac=134190902fcc76ab0a2f560dc706fde1f7f1bf9621107359140f356050a9f730&w=1480",
  },
  description: {
    type: String,
    default: "Hey there! I am new to Vraksh. Connect with me!",
    maxlength: [100, "Description cannot be more than 100 characters"],
  },
});

// Generate a magic link token (authKey)
UserSchema.methods.generateMagicLinkToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.authKey = crypto.createHash("sha256").update(token).digest("hex");
  return token;
};

module.exports = mongoose.model("User", UserSchema);
