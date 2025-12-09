const mongoose = require("mongoose");
const adoptPetSchema = new mongoose.Schema(
  {
    shelterId: { type: mongoose.Schema.Types.ObjectId, ref: "shelter" },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    name: { type: String },
    age: { type: String },
    species: {
      type: String,
      enum: ["dog", "cat", "rabbit", "cow", "other"],
      required: true,
    },
    breed: { type: String },
    gender: { type: String, enum: ["male", "female", "Not Sure"] },
    description: { type: String },
    images: { type: [String], default: [] },
    vaccinated: { type: Boolean, default: false },
    dewormed: { type: Boolean, default: false },
    sterilized: { type: Boolean, default: false },
    location: {
      type: {
        city: { type: String },
        state: { type: String },
      },
      required: true,
    },
    adoptStatus: {
      type: String,
      required: true,
      enum: ["Available", "Adopted", "Pending"],
      default: "Available",
    },
    adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    documents: { type: [String], default: [] },
  },
  { timestamps: true }
);

const AdoptPet = mongoose.model("adoptPet", adoptPetSchema);
module.exports = AdoptPet;
