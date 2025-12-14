const mongoose = require("mongoose");
const adoptPetSchema = new mongoose.Schema(
  {
    shelterId: { type: mongoose.Schema.Types.ObjectId, ref: "shelter" },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    name: { type: String, required: true, trim: true, minlength: 2,maxlength:50},
    age: { type: String, maxlength:20 },
    species: {
      type: String,
      enum: ["dog", "cat", "rabbit", "cow", "other"],
      required: true,
    },
    breed: { type: String, maxlength:50 },
    gender: { type: String, enum: ["male", "female", "Not Sure"] },
    description: { type: String, maxlength:500  },
    images: { type: [String], default: [],validate: [
        {
          validator: function (arr) {
        return arr.length <= 10},
          message: "Maximum 10 document Allowed",
        },
      ], },
    vaccinated: { type: Boolean, default: false },
    dewormed: { type: Boolean, default: false },
    sterilized: { type: Boolean, default: false },
    location: {
      type: {
        city: { type: String,  maxlength:50  },
        state: { type: String,  maxlength:50  },
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
    documents: { type: [String], default: [], validate: [
        {
          validator: function (arr) {
        return arr.length <= 10},
          message: "Maximum 10 document Allowed",
        },
      ], },
  },
  { timestamps: true }
);

const AdoptPet = mongoose.model("adoptPet", adoptPetSchema);
module.exports = AdoptPet;
