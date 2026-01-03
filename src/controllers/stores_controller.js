const{validateRegisterStoreData,validateUpdateStoreData}=require("../utils/validation")
const validator=require("validator")
const Store=require("../models/store_model")
const handleResisterNewStore = async (req, res) => {
  try {
    validateRegisterStoreData(req);
    const storeRegister=new Store({
      ...req.body,
      ownerId:req.userId,
      adminsUserId:[req.userId]
    })
    const newStore=await storeRegister.save();
    res.status(200).json({ message:`Store Id: ${newStore._id}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const handleUpdateOneStore = async (req, res) => {
  try {
    validateUpdateStoreData(req);
    const storeData=await Store.findById(req.params.sid)
    Object.keys(req.body).forEach(key=>{
      storeData[key]=req.body[key]
    })
    if(req.body.name ||req.body.businessName) storeData.isVerified=false;
    await storeData.save()
    res.status(200).json({ message: storeData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleAddAdmin = async (req, res) => {
  try {
    const addAdminId=req.body.addAdmin;
    const storeId=req.params.sid;
    if(!validator.isMongoId(addAdminId)) throw new Error("not valid id");
    const result=await Store.findByIdAndUpdate(storeId,{$addToSet:{adminsUserId:addAdminId}},{returnDocument:"after"})
    if(!result) throw new Error("Not Successful");

    res.status(200).json({ message: `List of admins ${result.adminsUserId}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleRemoveAdmin = async (req, res) => {
  try {
    const removeAdminId=req.body.removeAdmin;
    const storeId=req.params.sid;
    if(!validator.isMongoId(removeAdminId)) throw new Error("not valid id");
    const result=await Store.findByIdAndUpdate(storeId,{$pull:{adminsUserId:removeAdminId}},{returnDocument:"true"})
    if(!result) throw new Error("Not Successful");
    res.status(200).json({ message: `List of admins ${result.adminsUserId}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetAllStore = async (req, res) => {
  try {
    const result=await Store.find({})
    if(!result) throw new Error("Not Successful");
    res.status(200).json({ message: `List of Stores ${result}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetOneStore = async (req, res) => {
  try {
    const storeId=req.params.sid;
    if(!validator.isMongoId(storeId)) throw new Error("not valid id");
    const result=await Store.findById(storeId)
    if(!result) throw new Error("Not Successful");
    res.status(200).json({ message: `List of admins ${result}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
