const { validateRegisterStoreData, validateUpdateStoreData } = require("../utils/validation")
const validator = require("validator")
const Store = require("../models/store_model")
const throwError = require("../utils/throwError")
const handleResisterNewStore = async (req, res) => {
  try {
    validateRegisterStoreData(req);
    const storeRegister = new Store({
      ...req.body,
      ownerId: req.userId,
      adminsUserId: [req.userId]
    })
    const newStore = await storeRegister.save();
    res.status(200).json({ success: true, message: "Store Register Successfully", data: { StoreId: newStore._id } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};


const handleUpdateOneStore = async (req, res) => {
  try {
    validateUpdateStoreData(req);
    const storeData = await Store.findById(req.params.sid)
    Object.keys(req.body).forEach(key => {
      storeData[key] = req.body[key]
    })
    if (req.body.name || req.body.businessName) storeData.isVerified = false;
    await storeData.save()
    res.status(200).json({ success: true, message: "Update Successful", data: storeData });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleAddAdmin = async (req, res) => {
  try {
    const addAdminId = req.body.addAdmin;
    const storeId = req.params.sid;
    if (!validator.isMongoId(addAdminId)) throwError("not valid id", 400);
    const result = await Store.findByIdAndUpdate(storeId, { $addToSet: { adminsUserId: addAdminId } }, { returnDocument: "after" })
    if (!result) throwError("Not Successful", 404);

    res.status(200).json({ success: true, message: "Admin added successfully", data: { ListofAdmins: result.adminsUserId } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleRemoveAdmin = async (req, res) => {
  try {
    const removeAdminId = req.body.removeAdmin;
    const storeId = req.params.sid;
    if (!validator.isMongoId(removeAdminId)) throwError("not valid id", 400);
    const result = await Store.findByIdAndUpdate(storeId, { $pull: { adminsUserId: removeAdminId } }, { returnDocument: "true" })
    if (!result) throwError("Not Successful", 404);
    res.status(200).json({ success: true, message: "Admin Remove Successfully", data: { ListofAdmins: result.adminsUserId } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleGetAllStore = async (req, res) => {
  try {
    const result = await Store.find({})
    if (!result) throwError("Not Successful", 404);
    res.status(200).json({ success: true, message: "Fetched All Store Successfully", data: { ListofStores: result } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleGetOneStore = async (req, res) => {
  try {
    const storeId = req.params.sid;
    if (!validator.isMongoId(storeId)) throwError("not valid id", 400);
    const result = await Store.findById(storeId)
    if (!result) throwError("Not Successful", 404);
    res.status(200).json({ success: true, message: "Store fetched Successfully", data: { ListofAdmins: result } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};









module.exports = {
  handleResisterNewStore,
  handleUpdateOneStore,
  handleAddAdmin,
  handleRemoveAdmin,
  handleGetOneStore,
  handleGetAllStore,
};
