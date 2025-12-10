const Shelter = require("../models/shelter_model");
const AdoptPet = require("../models/adoptPet_model");

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

module.exports = { authorisedUsertoModifyPetDetails };
