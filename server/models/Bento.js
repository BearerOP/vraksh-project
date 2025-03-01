const mongoose = require("mongoose");

const BentoItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["link", "text", "image", "section-title"],
    required: [true, "Please add a type"],
  },
  shape: {
    type: String,
    default: "small-square",
    enum: ["small-square", "large-square", "wide-rectangle", "tall-rectangle"],
  },
  link: {
    type: String,
    trim: true,
    required: function () {
      return this.type === "link";
    },
  },
  text: {
    type: String,
    trim: true,
    required: function () {
      return this.type === "text";
    },
  },
  imageUrl: {
    type: String,
    trim: true,
    required: function () {
      return this.type === "image";
    },
  },
});

module.exports = mongoose.model("BentoItem", BentoItemSchema);
