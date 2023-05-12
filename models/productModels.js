const Mongoose = require("mongoose");

const productSChema = new Mongoose.Schema({
  imgUrl: { type: String },
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  rating: { type: Number, default: 0 },
  userId: { type: String },
  categoryId: { type: String },
  allRatings: { type: Array, default: [] },
});

const ProductModel = Mongoose.model("product", productSChema);
module.exports = ProductModel;
