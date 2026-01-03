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
    name:{type:String}
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      validate: [
        {
          validator: (item) =>  Array.isArray(item) && item.length > 0 ,
          message: "Order must contain at least one item",
        },
      ],
      required: true,
    },

    totalAmount: {
      type: Number,required: true, min: [0, "Total amount cannot be negative"], validate:{validator:function(){
        const sum=this.items.reduce((acc,curr)=>{return acc+curr.price*curr.qty},0)
        return Math.round(sum*100)===Math.round(this.totalAmount*100)
      },message:"Amount Mismatch:Total amount not match with order items"}
    },

    address: {
      name:{ type: String, required: true, trim: true, minlength: 2,maxlength:100},
      addressLine1: { type: String, required: true, trim: true, minlength: 10,maxlength:100},
      addressLine2: { type: String,trim: true,maxlength:100},
      street:{ type: String, maxlength:100},
      pincode: {type: String,required:true,trim:true,match: [/^[0-9]{6}$/, "Pincode must be 6 digit"],},
      city: {type: String, required: true, trim: true,maxlength:100},
      state: {type: String, required: true,trim: true,maxlength:100},
      country: {type: String, default: "India",maxlength:100},
      phone:{type: String,required:true, trim:true,match: [/^[0-9]{10}$/, "Phone must be 10 digit"],},
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
    shipping: {
        courier: {type: String,trim: true},
        trackingId:{type: String,trim: true,index: true},
        trackingUrl:{type: String,trim: true}
      },
    storeId: {type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      required: true,
      index: true
},

  },
  
  {timestamps: true})

  orderSchema.pre("save",function(){
    this.isPaid=this.payment?.status==="paid";
    if(this.status==="shipped" && !this.shippedAt) this.shippedAt=new Date();
    if(this.status==="delivered" && !this.deliveredAt) this.deliveredAt=new Date();
    if(this.status==="cancelled" && !this.cancelledAt) this.cancelledAt=new Date();
    
  })
  orderSchema.index({userId:1,createdAt:-1})
  orderSchema.index({status:1,createdAt:-1})
  orderSchema.index({"payment.orderId":1})



 const Order= mongoose.model("order", orderSchema);
 module.exports=Order;
