const mongoose = require("mongoose");

const BranchItemSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  title: {
    type: String
  },
  index: {
    type: Number,
    required: [true, "Index not provided"],
    default: "null",
  },
  url: {
    type: String,
    required: [true, "Please add a URL"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxLenght: [250, "Description cannot be more than 500 characters"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please add an image URL"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  style: {
    type: String,
    default: "classic",
    enum: ["default", "featured"],
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
});

module.exports = mongoose.model("BranchItem", BranchItemSchema);
