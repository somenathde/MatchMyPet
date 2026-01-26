const mongoose = require("mongoose")
const Store = require("../models/store_model")
const User = require("../models/user_model")
const Order = require("../models/order_model")
const throwError = require("../utils/throwError")

async function authorizeCancelOrder(req, res, next) {

  try {
    const orderId = req.params.oid.trim()
    if (!mongoose.isValidObjectId(orderId)) throwError("not valid order id", 400);
    const order = await Order.findById(orderId)
    if (!order) throwError("Order not found", 404);
    if (order.status == "delivered") throwError("already delivered", 409);
    if (order.status == "cancelled") throwError("already camcelled", 409);
    const user = await User.findById(req.userId)
    if (!user?.role === "admin" && order.status == "shipped") throwError("cant be cancelled", 409);
    if (user?.role === "admin") return next()
    else {
      if (order.userId.equals(req.userId)) return next()
      const store = await Store.findOne({ _id: order.storeId, adminsUserId: req.userId });
      if (store) return next()
      else throwError("you are not authorised", 403)
    }

  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}
async function authorizeStoreAdminOrPlatformAdminForOrders(req, res, next) {

  try {
    const user = await User.findById(req.userId)
    if (user?.role === "admin") { req.storeId = null; return next() }
    else {
      const store = await Store.findOne({ adminsUserId: req.userId });
      if (store) { req.storeId = store._id; return next() }
      else throwError("you are not authorised", 403)
    }

  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}
async function authorizeStoreAdminForOrder(req, res, next) {

  try {
    const orderId = req.params.oid.trim()
    if (!mongoose.isValidObjectId(orderId)) throwError("not valid order id", 400);
    const order = await Order.findById(orderId)
    if (!order) throwError("Order not found", 404);
    const store = await Store.findOne({ _id: order.storeId, adminsUserId: req.userId });
    if (store) return next()
    else throwError("you are not authorised", 403)
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

async function authorizeViewOrder(req, res, next) {

  try {
    const orderId = req.params.oid;
    const order = await Order.findById(orderId)
    if (!order) throwError("Order not found", 404);
    if (order?.userId?.equals(req.userId)) return next()
    else {
      const user = await User.findById(req.userId)
      if (user?.role === "admin") return next()
      else {
        const store = await Store.findOne({ _id: order.storeId, adminsUserId: req.userId });
        if (store) return next()
        else throwError("you are not authorised", 403)
      }
    }

  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}
async function authorizeAdminOrderAction(req, res, next) {

  try {
    //todo
    return next()

  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

module.exports = { authorizeCancelOrder, authorizeStoreAdminOrPlatformAdminForOrders, authorizeStoreAdminForOrder, authorizeViewOrder, authorizeAdminOrderAction }