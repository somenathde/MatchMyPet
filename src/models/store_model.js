const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema(
  {

    ownerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    businessName: {
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
    logo: { type: String, maxlength: 200 },
    isActive: {
      type: Boolean,
      default: true,
    },
    adminsUserId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    contactInfo: {
      emailId: {
        type: String,
        lowercase: true,
        trim: true,
        maxlength:100,
        unique: true,match: [/^\S+@\S+\.\S+$/,"Please enter a valid email address"],
      },
      phone: { type: String, match: [/^[0-9]{10}$/, "Phone must be 10 digit"]},
    },

    address: {
      street:{type:String,maxlength:50}, 
      city: {type:String,minlength:2,maxlength:50,required:true},
      state: {type:String,maxlength:50}, 
      pincode:{type:String,required:true, match: [/^[0-9]{6}$/, "Pincode must be 6 digit"]}, 
      country: {
        type: String,
        default: "India",maxlength:50
      },
    },
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
    isVerified:{
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const Store = mongoose.model("store", storeSchema);
module.exports = Store;
