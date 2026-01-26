const Shelter = require("../models/shelter_model");
const AdoptPet = require("../models/adoptPet_model");
const LostAndFound = require("../models/lostAndFound_model")
const GroomingProvider = require("../models/groomingProvider_model");
const Store = require("../models/store_model")
const validator = require("validator")
const throwError = require("../utils/throwError")


async function authorisedUsertoModifyPetDetails(req, res, next) {
  try {
    const pet = await AdoptPet.findById(req.params.id);
    if (!pet) throwError("not found", 404);
    if (!pet.ownerId.equals(req.userId)) {
      if (!pet.shelterId) throwError("You are not allowed", 403);
      const shelter = await Shelter.findById({ _id: pet.shelterId });
      if (!shelter) throwError("You are not allowed", 403);
      if (!shelter.adminsUserId.includes(req.userId))
        throwError("You are not allowed", 403);
    }
    next();
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}


async function authorisedUserToEditLostFoundPetDetail(req, res, next) {
  try {
    const petId = req.params.id;
    const lostAndFoundPet = await LostAndFound.findById(petId);
    if (!lostAndFoundPet) throwError("Pet Not Found", 400);
    if (!lostAndFoundPet.userId.equals(req.userId)) throwError("Not authorised", 403)
    next()
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }

}


async function authorizeGroomingProviderAdmin(req, res, next) {
  try {
    if (!req.groomingProviderId) {
      const groomingProvider = await GroomingProvider.findById(req.params.id)
      const isAdmin = groomingProvider.ownerId.equals(req.userId) || groomingProvider.admins.map(id => id.toString()).includes(req.userId)
      if (!isAdmin) throwError("User Not a Service providerAdmin", 403)
      req.groomingProviderId = groomingProvider._id
    }
    next()
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}


async function authorisedStoreAdmin(req, res, next) {

  try {
    if (res.locals.isStoreAdmin) return next()
    const storeId = req.params.sid;
    if (!storeId) throwError("StoreId needed", 400)
    if (!validator.isMongoId(storeId)) throwError("Not a valid Store", 400)
    const store = await Store.findOne({ _id: storeId, $or: [{ ownerId: req.userId }, { adminsUserId: req.userId }] }).select("_id")
    if (!store) throwError("unauthorised", 403);
    res.locals.isStoreAdmin = true;
    next()

  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

module.exports = { authorisedUsertoModifyPetDetails, authorisedUserToEditLostFoundPetDetail, authorizeGroomingProviderAdmin, authorisedStoreAdmin };
