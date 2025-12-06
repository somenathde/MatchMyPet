const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: { type: String, required: true ,unique:true, lowercase:true},
    phone: { type: String},
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "shelter-user", "admin"],
      default: "user",
    },
    address: { type: String },
    pet_owner: { type: String, enum: ["Yes", "No"], default: "No" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
