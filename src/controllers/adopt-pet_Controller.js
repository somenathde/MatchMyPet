const { truncate } = require("fs");
const AdoptPet = require("../models/adoptPet_model");
const Shelter = require("../models/shelter_model");
const { validatePetAdoptRegisterData } = require("../utils/validation");
const handleGetAllAdoptablePet = async (req, res) => {
  try {
    const adopatablePets = await AdoptPet.find({ adoptStatus: "Available" });
    res.status(200).json({ mesage: adopatablePets });
    //todo
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleAdoptPetRegister = async (req, res) => {
  try {
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
    res.status(200).json({ message: "Successfully uploaded" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleGetOnePetWithId = async (req, res) => {
  try {
    const pet = await AdoptPet.findById({ _id: req.params.id });
    if (!pet) throw new Error("invalid id");
    res.status(200).json({ message: pet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleDeleteOnePetWithId = async (req, res) => {
  try {
    const result = await AdoptPet.findByIdAndDelete({ _id: req.params.id });
    if (!result) throw new Error("Unable to delete");
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
   // todo validatePetAdoptUpdateData(req);

    const result = await AdoptPet.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!result) throw new Error("Unable to update");
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleAdoptaionStatusOnePetWithId = async (req, res) => {
  try {
    if (!["Available", "Adopted", "Pending"].includes(req.body.adoptStatus))
      throw new Error("not valid status");
    const result = await AdoptPet.findByIdAndUpdate(
      req.params.id,
      { adoptStatus: req.body.adoptStatus },
      { new: true }
    );
    if (!result) throw new Error("Unable to change adoption status");
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
