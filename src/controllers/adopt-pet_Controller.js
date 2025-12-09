const AdoptPet = require("../models/adoptPet_model");
const { validatePetAdoptRegisterData } = require("../utils/validation");
const handleGetAllAdoptablePet = async (req, res) => {
  try {
    const adopatablePets=await AdoptPet.find({adoptStatus:"Available"})
    res.status(200).json({mesage:adopatablePets})
    //todo
  } catch (error) {
    res.status(400).json({error:error.message})
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
    shelterId:req.shelterId||null,
    ownerId:req.userId,
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
    await adoptPet.save()
    res.status(200).json({ message:"Successfully uploaded" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { handleAdoptPetRegister, handleGetAllAdoptablePet };
