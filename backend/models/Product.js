const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please input product name"],
    },
    description: {
      type: String,
      required: [true, "Please input product description"],
    },
    price: { type: Number, required: [true, "Please input price"] },
    ratings: { type: Number, default: 0 },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Please input category"],
    },
    stock: {
      type: Number,
      required: [true, "Please input stock"],
      maxLength: [4, "Stock cannot exceed 4 chars"],
    },
    numOfReviews: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],

    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    createAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
