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
  imageUrl: {
    type: String,
    default: "/placeholder-profile.jpg",
  },
  backgroundImageUrl: {
    type: String,
    optional: true,
  },
  titleColor: {
    type: String,
    default: "",
    optional: true,
  },
  descriptionColor: {
    type: String,
    default: "",
    optional: true,
  },
  linkTextColor: {
    type: String,
    default: "",
    optional: true,
  },
  linkBorderSize: {
    type: String,
    default: "",
    optional: true,
  },
  linkBackgroundColor: {
    type: String,
    default: "",
    optional: true,
  },
  titleFont: {
    type: String,
    default: "",
    optional: true,
  },
  descriptionFont: {
    type: String,
    default: "",
    optional: true,
  },
  buttonTextFont: {
    type: String,
    default: "",
    optional: true,
  },
  avatarRounded: {
    type: String,
    optional: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Branch", BranchSchema);
