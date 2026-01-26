const LostAndFound = require("../models/lostAndFound_model");
const throwError = require("../utils/throwError")
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
    if (!result) throwError("Failed to save", 500);
    res.status(201).json({ success: true, message: "Saved Successfully", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleModifyLostOrFoundPet = async (req, res) => {
  try {
    validationlostAndFoundUpdatePetData(req);
    const petId = req.params.id;
    const data = req.body;
    const result = await LostAndFound.findByIdAndUpdate(petId, data, { returnDocument: "after", runValidators: true })
    if (!result) throwError("not updated", 404)
    res.status(200).json({ success: true, message: "Updated Successfully", data: result })

  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handlestatusforOneResolvePet = async (req, res) => {
  try {
    const allowedStaus = ["open", "resolve"]
    const petId = req.params.id;
    if (!allowedStaus.includes(req.body.status)) throw new Error("Invalid Status");
    const result = await LostAndFound.findByIdAndUpdate(petId, { status: req.body.status }, { returnDocument: "after" })
    if (!result) throwError("Failed to update", 404)
    res.status(200).json({ success: true, message: "Status Updated", data: result })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handlegetAllLostPet = async (req, res) => {
  try {
    const lostPets = await LostAndFound.find({ type: "lost", status: "open" });
    if (!lostPets) throwError("No lost pet found", 404)
    res.status(200).json({ success: true, message: "All Lost Pet Fetched Successfully", data: lostPets })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handlegetAllFoundPet = async (req, res) => {
  try {
    const foundPets = await LostAndFound.find({ type: "found", status: "open" });
    if (!foundPets) throwError("No pet found", 404)
    res.status(200).json({ success: true, message: "All found pets fetched successfully", data: foundPets })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handlegetOneLostOrFoundPet = async (req, res) => {
  try {
    if (!req.params.id) throw new Error("id can't be null")
    const pet = await LostAndFound.findById(req.params.id);
    if (!pet) throwError("not found", 404)
    res.status(200).json({ success: true, message: "Pet Feched Successfully", data: pet })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handlegetAllLostAndFoundPet = async (req, res) => {
  try {
    const allPets = await LostAndFound.find({ status: "open" });
    if (!allPets) throwError("No pet found", 404)
    res.status(200).json({ success: true, message: "Successfully Fetched all Lost and Found Pets", data: allPets })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handledeleteOneLostAndFoundPet = async (req, res) => {
  try {
    const petId = req.params.id;
    const result = await LostAndFound.findByIdAndDelete(petId)
    if (!result) throwError("Not Successful", 404)
    res.status(200).json({ success: true, message: "Deleted Successfully", data: deleted })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
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
