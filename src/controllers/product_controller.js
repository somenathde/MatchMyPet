const{validateNewProductRegistration,validateUpdateProductData}=require("../utils/validation")
const validator=require("validator")
const Product=require("../models/product_model")

const handleAddNewProduct = async (req, res) => {
  try {
    validateNewProductRegistration(req);
    const newProduct= new Product({...req.body})
    const result=await newProduct.save()
    res.status(200).json({ message: `Product ListedSuccesssfully, Product ID:${result._id}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleDeleteOneproduct = async (req, res) => {
  try {
    const productId=req.params.pid;
    const result=await Product.findByIdAndDelete(productId)
    if(!result) throw new Error("not successful");
    res.status(200).json({ message: `Product Deleted${result}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleGetListOfProductsofStore = async (req, res) => {
  try {
    const storeId=req.params.sid;
    const result=await Product.find({storeId})
    if(!result) throw new Error("not found");
    res.status(200).json({ message: result});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetListOfProducts = async (req, res) => {
  try {
    const result=await Product.find({})
    if(!result) throw new Error("not found");
    res.status(200).json({ message: result});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetOneproduct = async (req, res) => {
  try {
    const productId=req.params.pid;
    const result=await Product.findById(productId)
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleRateOneProduct = async (req, res) => {
  try {
      const rating=req.body.rating;
      const productId=req.params.pid;
      const storeId=req.params.sid;
      if(rating===undefined || typeof rating!=="number")throw new Error("Rating should be in Number")
      if(rating>5|| rating<1)throw new Error("Rating should 1 to 5");
      if(!validator.isMongoId(productId)) throw new Error("Not a valid product id");
      if(!validator.isMongoId(storeId)) throw new Error("Not a valid store mongo id");
      const product=await Product.findOne({_id:productId,storeId:storeId}).select("ratings")
      if(!product) throw new Error ("invalid Product");
      product.ratings.distribution[rating]=(product.ratings.distribution[rating]||0)+1
      product.ratings.totalRating+=rating;
      product.ratings.count+=1;
      const averageRating=Number((product.ratings.totalRating/product.ratings.count).toFixed(2))
      product.ratings.average=averageRating;
      await product.save()
      res.status(200).json({ message:`Average Rating:${product.ratings.average},Count:${product.ratings.count},Distribution:${product.ratings.distribution}, `});

      //todo per user 1 rating
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleModifyOneProduct = async (req, res) => {
  try {
    validateUpdateProductData(req);
    const result=await Product.findByIdAndUpdate(req.params.pid,req.body,{runValidators:true,returnDocument:"after"})
    if(!result)throw new Error("Product not found")
    res.status(200).json({ message: `Successfuly Updated: ${result}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
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