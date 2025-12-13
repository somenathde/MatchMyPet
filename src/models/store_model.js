const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    logo: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
    adminsUserId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    contactInfo: {
      emailId: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
      },
      phone: { type: String },
    },

    address: {
      street:{type:String}, 
      city: {type:String},
      state: {type:String}, 
      pincode:{type:String}, 
      country: {
        type: String,
        default: "India",
      },
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("store", storeSchema);
module.exports = Store;
