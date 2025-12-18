const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
   {
    category:{type:String, enum:["food",  "toys",  "accessories",  "medicine"], required:[true,"category is required"]},
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    description: {
      type: String,
      maxlength: 800,
    },

    MRP: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required:true,
      min:0,
      validate: {
        validator: function (value) {
          return  value <= this.MRP;
        },
        message: "price must be equal or less than MRP",
      },
    },

    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 10,
        message: "Maximum 10 images allowed",
      },
    },

    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      required: true,
      index: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    ratings: {
  average: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  count: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  distribution: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
},
isActive:{type:Boolean,default:true}
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
