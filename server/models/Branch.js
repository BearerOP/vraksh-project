const mongoose = require("mongoose");

const SocialIcon = {
  name: {
    type: String,
    required: [true, "Please add a social icon name"],
  },
  url: {
    type: String,
    required: [true, "Please add a social icon URL"],
  },
  icon: {
    type: String,
    required: [true, "Please add a social icon"],
  },
};

const BranchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please add a branch name"],
  },
  description: {
    type: String,
    required: [true, "Please add a branch description"],
  },
  socialIcons: {
    type: Array,
    default: [SocialIcon],
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BranchItem",
    },
  ],
  templateId: {
    type: String,
    default: "default",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Branch", BranchSchema);
