const Shelter = require("../models/shelter_model");
const AdoptPet = require("../models/adoptPet_model");
const LostAndFound=require("../models/lostAndFound_model")
const GroomingProvider=require("../models/groomingProvider_model");
const Store=require("../models/store_model")

const validator=require("validator")


async function authorisedUsertoModifyPetDetails(req, res, next) {
  try {
    const pet = await AdoptPet.findById({ _id: req.params.id });
    if (!pet) throw new Error("not found");
    if (!pet.ownerId.equals(req.userId)) {
      if (!pet.shelterId) throw new Error("not authorised");
      const shelter = await Shelter.findById({ _id: pet.shelterId });
      if (!shelter) throw new Error("not authorised");
      if (!shelter.adminsUserId.includes(req.userId))
        throw new Error("not authorised");
    }
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}


async function authorisedUserToEditLostFoundPetDetail(req,res,next) {
  try {
    const petId=req.params.id;
  const lostAndFoundPet=await LostAndFound.findById(petId);
  if(!lostAndFoundPet) throw new Error("Pet Not Found");
  if(!lostAndFoundPet.userId.equals(req.userId)) throw new Error("Not authorised")
    next()
  } catch (error) {
    res.status(400).json({errror:error.message})
  }
  
}


async function authorizeGroomingProviderAdmin(req,res,next) {
  try {
    if(!req.groomingProviderId) {
    const groomingProvider=await GroomingProvider.findById(req.params.id)
    const isAdmin = groomingProvider.ownerId.equals(req.userId) || groomingProvider.admins.map(id => id.toString()).includes(req.userId)
    if(!isAdmin) throw new Error("User Not a Service providerAdmin")
      req.groomingProviderId=groomingProvider._id}
    next()
  } catch (error) {
    res.status(400).json({errror:error.message})
  }
}

async function authorisedStoreAdmin(req,res,next) {
  try {
    if(!req.adminsUserId){
      const storeId=req.params.sid;
    if(!validator.isMongoId(storeId)) throw new Error ("Not a valid Store")
      const store= await Store.findById(storeId)
    if(!store)throw new Error("Store not found");
    const isAdmin=store.ownerId.equals(req.userId) || store.adminsUserId.includes(req.userId)
    if(!isAdmin) throw new Error("Not Authorised");
    else req.adminsUserId=req.userId;

    }
    next()
    
  } catch (error) {
    res.status(400).json({errror:error.message})
  }
}

module.exports = { authorisedUsertoModifyPetDetails,authorisedUserToEditLostFoundPetDetail,authorizeGroomingProviderAdmin,authorisedStoreAdmin };
