import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      // name of the product
      type: String,
      required: true,
    },
    image: {
      // image of the product
      type: String,
      required: true,
    },
    brand: {
      // brand of the product
      type: String,
      required: true,
    },
    category: {
      // category of the product
      type: String,
      required: true,
    },
    description: {
      // description of the product
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      // rating of the product
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      // number of reviews of the product
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      // price of the product
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      // count in stock of the product
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
