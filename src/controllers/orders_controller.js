const { validationOrderData } = require("../utils/validation")
const validator = require("validator")
const mongoose = require("mongoose")
const Product = require("../models/product_model")
const Order = require("../models/order_model");
const Store = require("../models/store_model");
const User = require("../models/user_model");
const throwError = require("../utils/throwError")


const handlePlaceOrder = async (req, res) => {
  try {
    validationOrderData(req);
    const productIds = req.body.items.map(item => { return item.productId });
    const products = await Product.find({ _id: { $in: productIds }, storeId: req.params.sid }).select("_id price name");
    if (productIds.length !== products.length) throwError("one or more product not found or duplicate item added in cart or all item not from same store", 400);
    const productMap = {};
    products.forEach((product) => {
      productMap[product._id.toString()] = {
        price: product.price,
        name: product.name
      }
    });
    const orderItems = [];
    let totalAmount = 0;
    req.body.items.forEach(item => {
      const product = productMap[item.productId];
      if (!product) throwError("Product mapping failed", 400)
      totalAmount += (product.price * item.qty);
      orderItems.push({
        productId: item.productId,
        qty: item.qty,
        price: product.price,
        name: product.name

      });
    })
    totalAmount = Math.round(totalAmount * 100) / 100;

    const newOrder = new Order({
      userId: req.userId,
      items: orderItems,
      totalAmount: totalAmount,
      address: req.body.address,
      payment: { method: req.body.paymentMethod },
      storeId: req.params.sid

    });
    const order = await newOrder.save()
    res.status(200).json({ success: true, message: "Order Placed Successsfully", data: { orderId: order._id, Amount: order.totalAmount, Status: order.status, orderItems: order.items } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleGetOrderHistoryOfAUser = async (req, res) => {
  try {
    const orderId = req.params.oid.trim()
    if (!mongoose.isValidObjectId(orderId)) throwError("not valid order id", 400);
    const orders = await Order.find({ userId: req.userId })
    if (!orders) throwError("Please place order, no order found", 404)

    res.status(200).json({ success: true, message: "Order history Fetched successful", data: orders });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleCancelOrder = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.oid)) throwError("not valid order id", 400);
    const cancelOrder = await Order.findByIdAndUpdate(req.params.oid, { status: "cancelled" }, { runValidators: true, returnDocument: "after" })
    if (!cancelOrder) throwError("Unable to cancel order", 404)
    res.status(200).json({ success: true, message: "Order Cancelled", data: { Status: cancelOrder.status } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleUpdateOrderbyAdmin = async (req, res) => {
  try {
    //todo
    res.status(200).json({ success: true, message: "Done", data: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
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
    if (req.storeId) {
      orders = await Order.find({ storeId: req.storeId })
    } else { orders = await Order.find() }

    res.status(200).json({ success: true, message: "Successfully Fetched Orders", data: orders });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleModifyQuantityofOrderedProduct = async (req, res) => {
  try {
    //todo
    res.status(200).json({ success: true, message: "Modified Successfully", data: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleModifyOderStatusAndTracking = async (req, res) => {
  try {
    const orderId = req.params.oid.trim()
    const order = await Order.findById(orderId);
    if (!order) throwError("order not found", 404);
    const { courier, trackingId } = req.body
    if (!order.shipping) order.shipping = {};
    if (!courier && !trackingId) throw new Error("Nothing to update")
    if (courier) order.shipping.courier = courier;
    if (trackingId) order.shipping.trackingId = trackingId;
    const normalizedCourier = courier?.trim().toLowerCase();
    const trackingUrlMap = {
      delhivery: (id) => `https://www.delhivery.com/tracking/${id}`,
      bluedart: (id) => `https://bluedart.com/tracking/${id}`,
    };
    if (normalizedCourier && trackingId && trackingUrlMap[normalizedCourier]) {
      order.shipping.trackingUrl = trackingUrlMap[normalizedCourier](trackingId);
    } else if (trackingId && courier) {
      order.shipping.trackingUrl = "Please check on courier website";
    }
    order.status = "shipped"//todo
    await order.save()

    res.status(200).json({ success: true, message: "Successfully Updated", data: { ShippingDetails: order.shipping } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handlegetSingleOrderdetail = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.oid)) throwError("Not valid mongo Id", 400);
    const order = await Order.findById(req.params.oid)
    if (!order) throwError("Order not found", 404)

    if (order.userId.toString === req.userId) { res.status(200).json({ success: true, message: "Order detail Fetched", data: order }) }
    const store = await Store.findById(order.storeId)

    if (store && store.adminsUserId.some(id => id.equals(req.userId))) { res.status(200).json({ success: true, message: "Order Detail Fetched Successfuly", data: order }) }
    const user = await User.findById(req.userId)
    if (user.role === "admin") { res.status(200).json({ success: true, message: "Order Fetched Successful", data: order }) }
    throwError("Forbidden", 403)
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
module.exports = { handlePlaceOrder, handlegetSingleOrderdetail, handleGetOrderHistoryOfAUser, handleCancelOrder, handleUpdateOrderbyAdmin, handleGetAllReceivedOrders, handleModifyOderStatusAndTracking, handleModifyQuantityofOrderedProduct, }