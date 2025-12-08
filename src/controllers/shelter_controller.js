const Shelter = require("../models/shelter_model");
const { validationShelterRegisterData } = require("../utils/validation");
const registerShelter = async (req, res) => {
  try {
    console.log(11)
    validationShelterRegisterData(req);
    const { name, emailId, phone, address, documents } = req.body;

    const shelter = new Shelter({
      name,
      emailId,
      address,
      phone,
      adminsUserId: req.userId,
      documents,
    });
    await shelter.save();

    res.status(200).json("Shelter is registered Successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registerShelter };
