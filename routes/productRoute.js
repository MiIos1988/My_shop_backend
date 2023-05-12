const express = require("express");
const ProductModel = require("../models/productModels");
const productRoute = express.Router();

productRoute.post("/get-product", async (req, res) => {
  const countQuery = await ProductModel.where({}).countDocuments();
  let pagination = req.body;
  ProductModel.find({})
    .skip(pagination.start * pagination.perPage)
    .limit(pagination.perPage)
    .then((data) => {
      res.send({ data, countQuery });
    })
    .catch((err) => console.log(err));
});

productRoute.post("/search-product", async (req, res) => {
  const countQuery = await ProductModel.where({
    title: { $regex: req.body.search, $options: "i" },
  }).countDocuments();
  ProductModel.find({ title: { $regex: req.body.search, $options: "i" } })
    .then((data) => res.send({ data, countQuery }))
    .catch((err) => res.send(err));
});

productRoute.post("/category-product", async (req, res) => {
  let pagination = req.body.pagination;
  const countQuery = await ProductModel.where({
    categoryId: req.body.categoryId,
  }).countDocuments();
  ProductModel.find( {categoryId: req.body.categoryId} )
  .skip(pagination.start * pagination.perPage)
    .limit(pagination.perPage)
    .then((data) => {
      res.send({ data, countQuery })
    })
    .catch((err) => res.send(err));
});

productRoute.get("/get-one-product/:id", (req, res) => {
  ProductModel.findOne({ _id: req.params.id })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => res.status(421).send(err));
});

productRoute.put("/edit-product", (req, res) => {
  ProductModel.findOneAndUpdate({ _id: req.body._id }, req.body)
    .then((data) => res.send("ok"))
    .catch((err) => console.log(err));
});

productRoute.post("/add-product", async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    newProduct.save();
    res.send("ok");
  } catch (err) {
    res.status(420).send("Error in database");
  }
});

productRoute.delete("/product", (req, res) => {
  ProductModel.findOneAndRemove(req.query)
    .then((data) => res.send("ok"))
    .catch((err) => console.log(err));
});

module.exports = productRoute;
