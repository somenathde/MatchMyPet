const mongoose = require("mongoose");
const lostAndFoundSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user",required:true },
    type: { type: String, enum: ["lost", "found"], required: true },
    petType: {
      type: String,
      enum: ["dog", "cat", "rabbit", "other", "bird"],
      required: true,
    },
    breed: { type: String },
    color: { type: String, required: true },
    lastSeenLocation: {
      city: { type: String, required: true },
      area: { type: String, required: true },
      pincode: {
        type: String,
        match: [/^[0-9]{6}$/, "Pincode must be 6 digit"],
      },
    },
    description: { type: String, required: true },
    images: {
      type: [String],
      default: [],
      validate: [
        {
          validator: (arr) => arr.length <= 10,
          message: "Maximum 10 images allowed",
        },
      ],
    },
    contactNumber: { type: String, required: true },
    status: { type: String, enum: ["open", "resolved"], default: "open" },
  },
  { timestamps: true }
);

const LostAndFound =mongoose.model("lostAndFound",lostAndFoundSchema);
module.exports = LostAndFound;
