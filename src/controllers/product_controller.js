const { validateNewProductRegistration, validateUpdateProductData } = require("../utils/validation")
const validator = require("validator")
const Product = require("../models/product_model")
const throwError = require("../utils/throwError")

const handleAddNewProduct = async (req, res) => {
  try {
    validateNewProductRegistration(req);
    const newProduct = new Product({ ...req.body })
    const result = await newProduct.save()
    res.status(200).json({ success: true, message: "Product ListedSuccesssfully", data: { ProductID: result._id } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleDeleteOneproduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const result = await Product.findByIdAndDelete(productId)
    if (!result) throwError("not successful", 404);
    res.status(200).json({ success: true, message: "Product Deleted$", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleGetListOfProductsofStore = async (req, res) => {
  try {
    const storeId = req.params.sid;
    const result = await Product.find({ storeId })
    if (!result) throwError("not found", 404);
    res.status(200).json({ success: true, message: "Fetchwed Product Successfully", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleGetListOfProducts = async (req, res) => {
  try {
    const result = await Product.find({})
    if (!result) throwError("not found", 404);
    res.status(200).json({ success: true, message: "Product Fetched successfully", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleGetOneproduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const result = await Product.findById(productId)
    res.status(200).json({ success: true, message: "Product fetched Successfully", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleRateOneProduct = async (req, res) => {
  try {
    const rating = req.body.rating;
    const productId = req.params.pid;
    const storeId = req.params.sid;
    if (rating === undefined || typeof rating !== "number") throwError("Rating should be in Number", 400)
    if (rating > 5 || rating < 1) throwError("Rating should 1 to 5", 400);
    if (!validator.isMongoId(productId)) throwError("Not a valid product id", 400);
    if (!validator.isMongoId(storeId)) throwError("Not a valid store id", 400);
    const product = await Product.findOne({ _id: productId, storeId: storeId }).select("ratings")
    if (!product) throwError("invalid Product", 404);
    product.ratings.distribution[rating] = (product.ratings.distribution[rating] || 0) + 1
    product.ratings.totalRating += rating;
    product.ratings.count += 1;
    const averageRating = Number((product.ratings.totalRating / product.ratings.count).toFixed(2))
    product.ratings.average = averageRating;
    await product.save()
    res.status(200).json({ success: true, message: "Rating Saved Successfully", data: { AverageRating: product.ratings.average, Count: product.ratings.count, Distribution: product.ratings.distribution } });

    //todo per user 1 rating
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleModifyOneProduct = async (req, res) => {
  try {
    validateUpdateProductData(req);
    const result = await Product.findByIdAndUpdate(req.params.pid, req.body, { runValidators: true, returnDocument: "after" })
    if (!result) throwError("Product not found", 404)
    res.status(200).json({ success: true, message: "Successfuly Updated", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};


module.exports = {
  handleAddNewProduct,
  handleModifyOneProduct,
  handleDeleteOneproduct,
  handleGetListOfProducts,
  handleGetOneproduct,
  handleRateOneProduct,
  handleGetListOfProductsofStore,
};