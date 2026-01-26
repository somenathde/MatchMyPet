const { truncate } = require("fs");
const AdoptPet = require("../models/adoptPet_model");
const throwError = require("../utils/throwError")
const {
  validatePetAdoptRegisterData,
  validatePetAdoptUpdateData,
} = require("../utils/validation");
const handleGetAllAdoptablePet = async (req, res) => {
  try {
    const adopatablePets = await AdoptPet.find({ adoptStatus: "Available" });
    res.status(200).json({
      success: true,
      data: adopatablePets,
      message: "Adoptable pets fetched successfully"
    });
    //todo
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleAdoptPetRegister = async (req, res) => {
  try {
    console.log("USER ID:", req.userId);
    console.log("SHELTER ID:", req.shelterId);

    validatePetAdoptRegisterData(req);
    const {
      name,
      age,
      species,
      breed,
      gender,
      description,
      images,
      vaccinated,
      dewormed,
      sterilized,
      location,
      documents,
    } = req.body;

    const adoptPet = new AdoptPet({
      shelterId: req.shelterId || null,
      ownerId: req.userId,
      name,
      age,
      species,
      breed,
      gender,
      description,
      images,
      vaccinated,
      dewormed,
      sterilized,
      location,
      documents,
    });
    await adoptPet.save();
    res.status(200).json({ success: true, message: "Successfully uploaded", data: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleGetOnePetWithId = async (req, res) => {
  try {
    const pet = await AdoptPet.findById({ _id: req.params.id });
    if (!pet) throwError("Pet Not Found", 404);
    res.status(200).json({ success: true, message: "Pet fetched successfully", data: pet })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleDeleteOnePetWithId = async (req, res) => {
  try {
    const result = await AdoptPet.findByIdAndDelete({ _id: req.params.id });
    if (!result) throwError("Unable to delete", 404);
    res.status(200).json({ success: true, message: "Deleted", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleUpdateOnePetWithId = async (req, res) => {
  try {
    const data = req.body;
    const ALLOWED_UPDATES = [
      "age",
      "gender",
      "breed",
      "images",
      "vacinated",
      "dewormed",
      "sterilized",
      "adoptStatus",
    ];
    const isUPDATE_ALLOWED = Object.keys(data).every((key) => {
      return ALLOWED_UPDATES.includes(key);
    });
    if (!isUPDATE_ALLOWED)
      throw new Error("All seleted fields are not allowed");
    validatePetAdoptUpdateData(req);
    const result = await AdoptPet.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!result) throwError("Unable to update", 400);
    res.status(200).json({ success: true, message: "Successfully Updated", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleAdoptaionStatusOnePetWithId = async (req, res) => {
  try {
    if (!["Available", "Adopted", "Pending"].includes(req.body.adoptStatus))
      throwError("not valid status", 400);
    const result = await AdoptPet.findByIdAndUpdate(
      req.params.id,
      { adoptStatus: req.body.adoptStatus },
      { new: true }
    );
    if (!result) throwError("Unable to change adoption status", 404);
    res.status(200).json({ success: true, message: "Successfully Fetched Adoption Status", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

module.exports = {
  handleAdoptPetRegister,
  handleGetAllAdoptablePet,
  handleGetOnePetWithId,
  handleDeleteOnePetWithId,
  handleUpdateOnePetWithId,
  handleAdoptaionStatusOnePetWithId,
};
