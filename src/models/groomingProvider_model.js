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
         match: [/^[0-9]{10}$/, "Pincode must be 6 digits"]
      },
      email: {
        type: String,
        lowercase: true,match: [/^\S+@\S+\.\S+$/,"Please enter a valid email address"],
      },
    },

    address: {
      city: {
        type: String,
        required: true,
        index: true,
          maxlength: 50
      },
      state: {
        type: String,
        required: true,
        index: true,
         maxlength: 50
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
      gstNumber: {type:String,maxlength:15},
      licenseNumber:{type:String, maxlength:50},
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

const GroomingProvider = mongoose.model("groomingProvider", groomingProviderSchema);
module.exports=GroomingProvider;