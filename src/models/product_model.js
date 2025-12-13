const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
   {
    category:{type:String, enum:["food",  "toys",  "accessories",  "medicine"]},
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
      ref: "Store",
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
}

  },
  { timestamps: true }
);

const Store = mongoose.model("store", storeSchema);
module.exports = Store;
