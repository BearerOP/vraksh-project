const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  branchName: {
    type: String,
    required: [true, "Please add a branch name"],
  },
  branchDescription: {
    type: String,
    required: [true, "Please add a branch description"],
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BranchItem",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Branch", BranchSchema);
