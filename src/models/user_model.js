const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength:2, maxlength:50},
    lastName: { type: String, maxlength:50 },
    emailId: { type: String, required: true ,unique:true, lowercase:true,trim:true,match: [/^\S+@\S+\.\S+$/,"Please enter a valid email address"],},
    phone: { type: String, match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]},
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "shelter-user", "admin"],
      default: "user",
    },
    address: { type: String, maxlength:100 },
    pet_owner: { type: String, enum: ["Yes", "No"], default: "No" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
