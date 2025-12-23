const{validationOrderData}=require("../utils/validation")
const Product=require("../models/product_model")
const Order=require("../models/order_model")


const handlePlaceOrder = async (req, res) => {
  try {
    validationOrderData(req);
    const productIds=req.body.items.map(item=>{return item.productId});
    const products=await Product.find({_id:{$in:productIds},storeId:req.params.sid}).select("_id price name");
    if(productIds.length!==products.length) throw new Error("one or more product not found or duplicate item added in cart or all item not from same store");
    const productMap={};
    products.forEach((product)=>{
      productMap[product._id.toString()]={
        price:product.price,
        name:product.name
      }
    });
    const orderItems=[];
    let totalAmount=0;
    req.body.items.forEach(item=>{
      const product=productMap[item.productId];
      if(!product) throw new Error("Product mapping failed")
      totalAmount+=(product.price*item.qty);
      orderItems.push({
        productId:item.productId,
        qty:item.qty,
        price:product.price,
        name:product.name
        
      });
    })
    totalAmount=Math.round(totalAmount*100)/100;

    const newOrder=new Order({
      userId:req.userId,
      items:orderItems,
      totalAmount:totalAmount,
      address:req.body.address,
      payment:{method:req.body.paymentMethod}

    });
    const order=await newOrder.save()
    res.status(200).json({ message: `orderId:${order._id},Amount:${order.totalAmount},Sataus:${order.status},orderItems:${order.items}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleModifyOrder = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetOrderHistoryOfAUser = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleCancelOrder = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleUpdateOrder = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetListOfOrders = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports={handlePlaceOrder,handleModifyOrder,handleGetOrderHistoryOfAUser,handleCancelOrder,handleUpdateOrder,handleGetListOfOrders}