const BentoItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  type: {
    type: String,
    enum: ["link", "text", "image", "section-title"],
    required: [true, "Please add a type"],
  },
  shape:{
    type: String,
    default: "small-square",
    enum: ["small-square", "large-square", "wide-rectangle", "tall-rectangle"],
  },
  link: {
    type: String,
    required: [true, "Please add a link"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please add an image URL"],
  },
});

module.exports = mongoose.model("BentoItem", BentoItemSchema);
