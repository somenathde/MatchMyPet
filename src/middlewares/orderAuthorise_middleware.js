const mongoose=require("mongoose")
const Store=require("../models/store_model")
const User=require("../models/user_model")
const Order=require("../models/order_model")

async function authorizeCancelOrder(req,res,next) {
 
  try {
    const orderId=req.params.oid.trim()
    if(!mongoose.isValidObjectId(orderId)) throw new Error("not valid order id");
    const order=await Order.findById(orderId)
    if(!order) throw new Error("Order not found");
    if(order.status=="delivered")throw new Error("already delivered");
    if(order.status=="cancelled")throw new Error("already camcelled");
    const user=await User.findById(req.userId)
    if(!user?.role==="admin" && order.status=="shipped")throw new Error("cant be cancelled");
    if(user?.role==="admin") return next()
    else{
  if(order.userId.equals(req.userId)) return next() 
  const store=await Store.findOne({_id:order.storeId, adminsUserId:req.userId});
  if(store) return next() 
    else throw new Error("you are not authorised")
  }

  } catch (error) {
    res.status(400).json({error:error.message})
  }
}
async function authorizeStoreAdminOrPlatformAdminForOrders(req,res,next) {
 
  try {
    const user=await User.findById(req.userId)
    if(user?.role==="admin"){req.storeId=null;return next()} 
      else{
        const store=await Store.findOne({adminsUserId:req.userId});
        if(store){req.storeId=store._id;return next()}
          else throw new Error("you are not authorised")
    }
   
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}
async function authorizeStoreAdminForOrder(req,res,next) {
 
  try {
    const orderId=req.params.oid.trim()
    if(!mongoose.isValidObjectId(orderId)) throw new Error("not valid order id");
    const order=await Order.findById(orderId)
    if(!order) throw new Error("Order not found");
    const store=await Store.findOne({_id:order.storeId,adminsUserId:req.userId});
        if(store)return next()
          else throw new Error("you are not authorised")
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

async function authorizeViewOrder(req,res,next) {
 
  try {
    const orderId=req.params.oid;
    const order=await Order.findById(orderId)
    if(!order) throw new Error("Order not found");
    if(order?.userId?.equals(req.userId)) return next()
   else{
    const user=await User.findById(req.userId)
    if(user?.role==="admin") return next()
      else{
        const store=await Store.findOne({_id:order.storeId,adminsUserId:req.userId});
        if(store)return next()
          else throw new Error("you are not authorised")
    }
  }

  } catch (error) {
    res.status(400).json({error:error.message})
  }
}
async function authorizeAdminOrderAction(req,res,next) {
 
  try {
   //todo
    return next()

  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

module.exports={authorizeCancelOrder, authorizeStoreAdminOrPlatformAdminForOrders,authorizeStoreAdminForOrder,authorizeViewOrder,authorizeAdminOrderAction}