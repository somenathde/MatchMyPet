const LostAndFound = require("../models/lostAndFound_model");
const {
  validationlostAndFoundRegisterPetData,
  validationlostAndFoundUpdatePetData,
} = require("../utils/validation");
const handleregisterLostOrFoundPet = async (req, res) => {
  try {
    validationlostAndFoundRegisterPetData(req);
    const {
      type,
      petType,
      breed,
      color,
      lastSeenLocation,
      description,
      contactNumber,
      images,
    } = req.body;
    const lostAndFound = new LostAndFound({
      userId: req.userId,
      type,
      petType,
      breed,
      color,
      lastSeenLocation,
      description,
      contactNumber,
      images,
    });
    const result = await lostAndFound.save();
    if (!result) throw new Error("Failed to save");
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleModifyLostOrFoundPet = async (req, res) => {
  try {
    validationlostAndFoundUpdatePetData(req);
    const petId = req.params.id;
    const data=req.body;
    const result=await LostAndFound.findByIdAndUpdate(petId,data,{returnDocument:"after",runValidators:true})
    if(!result) throw new Error("not updated")
        res.status(200).json({message:result})
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handlestatusforOneResolvePet = async (req, res) => {
  try {
    const allowedStaus=["open","resolve"]
    const petId = req.params.id;
    if(!allowedStaus.includes(req.body.status)) throw new Error("Invalid Status");
    const result=await LostAndFound.findByIdAndUpdate(petId,{status:req.body.status},{returnDocument:"after"})
    if(!result) throw new Error("Failed to update")
    res.status(200).json({message:result})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handlegetAllLostPet = async (req, res) => {
  try {
    const lostPets=await LostAndFound.find({type:"lost",status:"open"});
    if(!lostPets) throw new Error("No lost pet found")
        res.status(200).json({message:lostPets})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handlegetAllFoundPet = async (req, res) => {
  try {
    const foundPets=await LostAndFound.find({type:"found",status:"open"});
    if(!foundPets) throw new Error("No pet found")
        res.status(200).json({message:foundPets})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handlegetOneLostOrFoundPet = async (req, res) => {
  try {
   if(! req.params.id) throw new Error("id can't be null")
    const pet=await LostAndFound.findById(req.params.id);
if(!pet) throw new Error("not found")
    res.status(200).json({message:pet})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handlegetAllLostAndFoundPet = async (req, res) => {
  try {
    const allPets=await LostAndFound.find({status:"open"});
    if(!allPets) throw new Error("No pet found")
        res.status(200).json({message:allPets})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handledeleteOneLostAndFoundPet = async (req, res) => {
  try {
    const petId=req.params.id;
    const result= await LostAndFound.findByIdAndDelete(petId)
    if(!result) throw new Error("Not Successful")
    res.status(200).json({message:"Deleted"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handleregisterLostOrFoundPet,
  handleModifyLostOrFoundPet,
  handlestatusforOneResolvePet,
  handlegetAllLostPet,
  handlegetAllFoundPet,
  handlegetOneLostOrFoundPet,
  handlegetAllLostAndFoundPet,
  handledeleteOneLostAndFoundPet,
};
