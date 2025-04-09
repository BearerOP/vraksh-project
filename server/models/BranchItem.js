const mongoose = require("mongoose");

const BranchItemSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
    index: true, // Optimized for queries
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
  },
  index: {
    type: Number,
    required: [true, "Index not provided"],
    default: null,
  },
  url: {
    type: String,
    required: [true, "Please add a URL"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [250, "Description cannot be more than 250 characters"],
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  style: {
    type: String,
    default: "classic",
    enum: ["classic", "featured"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("BranchItem", BranchItemSchema);
