const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
      index: true,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      validate: [
        {
          validator: (item) => item.length > 0,
          message: "Order must contain at least one item",
        },
      ],
      required: true,
    },

    totalAmount: {
      type: Number,required: true, min: [0, "Total amount cannot be negative"],
    },

    address: {

      AddressLine_1: { type: String, required: true, trim: true, minlength: 10},
      AddressLine_2: { type: String,trim: true},
      pincode: {type: String,match: [/^[0-9]{6}$/, "Pincode must be 6 digit"]},
      city: {type: String, required: true, trim: true},
      state: {type: String, required: true,trim: true},
      country: {type: String, default: "India"}
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true
    },

    payment: {
      method: {
        type: String,
        enum: ["razorpay", "cod"],
        required: true
      },
      paymentId: {
        type: String,
      },
      orderId: {
        type: String,
      },
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
      },
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    shippedAt: Date,
    deliveredAt: Date,
    cancelledAt: Date,
  },
  {timestamps: true})

module.exports = mongoose.model("order", orderSchema)
