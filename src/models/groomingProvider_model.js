const mongoose = require("mongoose");

const groomingProviderSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    providerType: {
      type: String,
      enum: ["individual", "company"],
      default: "individual",
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
      },
    },

    address: {
      city: {
        type: String,
        required: true,
        index: true,
      },
      state: {
        type: String,
        required: true,
        index: true,
      },
      pincode: {
        type: String,
        match: [/^[0-9]{6}$/, "Pincode must be 6 digits"],
      },
    },
    admins: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "user",
}],
    documents: {
      gstNumber: {type:String,},
      licenseNumber:{type:String},
      document: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 4,
        message: "Maximum 4 images allowed",
      },
    },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("groomingProvider", groomingProviderSchema);
