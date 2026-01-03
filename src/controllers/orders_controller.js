const{validationOrderData}=require("../utils/validation")
const validator=require("validator")
const mongoose=require("mongoose")
const Product=require("../models/product_model")
const Order=require("../models/order_model");
const Store = require("../models/store_model");
const User = require("../models/user_model");


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
      payment:{method:req.body.paymentMethod},
      storeId:req.params.sid

    });
    const order=await newOrder.save()
    res.status(200).json({ message: `orderId:${order._id},Amount:${order.totalAmount},Sataus:${order.status},orderItems:${order.items}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleGetOrderHistoryOfAUser = async (req, res) => {
  try {
    const orderId=req.params.oid.trim()
      if(!mongoose.isValidObjectId(orderId)) throw new Error("not valid order id");
    const orders=await Order.find({userId:req.userId})
    if(!orders)throw new Error("Please place order, no order found")

    res.status(200).json({ message: orders});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleCancelOrder = async (req, res) => {
  try {
    const cancelOrder=await Order.findByIdAndUpdate(req.params.oid,{status:"cancelled"},{runValidators:true,returnDocument:"after"})
    if(!cancelOrder)throw new Error("Unable to cancel order")
    res.status(200).json({ message: `Order Status: ${cancelOrder.status}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleUpdateOrderbyAdmin = async (req, res) => {
  try {
    //todo
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/*const handleGetListOfOrders = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
*/
const handleGetAllReceivedOrders = async (req, res) => {
  try {
    let orders;
  if(req.storeId){ orders=await Order.find({storeId:req.storeId})
  }else { orders=await Order.find()}

  res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleModifyQuantityofOrderedProduct = async (req, res) => {
  try {
      //todo
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleModifyOderStatusAndTracking = async (req, res) => {
  try {
    const orderId=req.params.oid.trim()
    const order=await Order.findById(orderId);
    if(!order) throw new Error("order not found");
    const{courier,trackingId}=req.body
    if(!order.shipping) order.shipping={};
    if(!courier && !trackingId) throw new Error ("Nothing to update")
    if(courier)order.shipping.courier=courier;
    if(trackingId)order.shipping.trackingId=trackingId;
    const normalizedCourier = courier?.trim().toLowerCase();
    const trackingUrlMap = {
      delhivery: (id) => `https://www.delhivery.com/tracking/${id}`,
      bluedart: (id) => `https://bluedart.com/tracking/${id}`,
    };
    if (normalizedCourier && trackingId && trackingUrlMap[normalizedCourier]) {
      order.shipping.trackingUrl=trackingUrlMap[normalizedCourier](trackingId);
    } else if (trackingId && courier) {
      order.shipping.trackingUrl = "Please check on courier website";
}
    order.status="shipped"//todo
    await order.save()

    res.status(200).json({ ShippingDetails:order.shipping });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handlegetSingleOrderdetail = async (req, res) => {
  try {
    if(!validator.isMongoId(req.params.oid)) throw new Error("Not valid mongo Id");
    const order=await Order.findById(req.params.oid)
    if(!order)throw new Error("Order not found")
  
    if(order.userId.toString===req.userId ){res.status(200).json({ message: order })}
    const store=await Store.findById(order.storeId)

    if(store && store.adminsUserId.some(id=>id.equals(req.userId)) ){res.status(200).json({ message: order })}
    const user=await User.findById(req.userId)
    if(user.role==="admin"){res.status(200).json({ message: order })}
    throw new Error("Unauthorised")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports={handlePlaceOrder,handlegetSingleOrderdetail,handleGetOrderHistoryOfAUser,handleCancelOrder,handleUpdateOrderbyAdmin,handleGetAllReceivedOrders,handleModifyOderStatusAndTracking,handleModifyQuantityofOrderedProduct,}