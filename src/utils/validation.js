const validator = require("validator");

const validationSignupData = (req) => {
  const { firstName, lastName, emailId, password, address, phone, role } =
    req.body;
  if (!firstName) {
    throw new Error("name is not valid");
  } else if (firstName.length < 2 || firstName.length > 50) {
    throw new Error("FistName should be 3 to 50 Character");
  } else if (lastName && lastName.length > 50) {
    throw new Error("LastName should be 0-50 Character");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email id not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  } else if (address && address.length > 200) {
    throw new Error("address should below 200 Character");
  } else if (phone && !validator.isMobilePhone(phone, "en-IN")) {
    throw new Error("phone number is not valid");
  } else if (role && !["user", "shelter-user"].includes(role)) {
    throw new Error("Invalid Role");
  }
};

const validationLoginData = (emailId) => {
  if (!validator.isEmail(emailId)) throw new Error("Invalid Email");
};

const validationUpdateUserData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "phone",
    "password",
    "address",
    "pet_owner",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

const validationShelterRegisterData = (req) => {
  const { name, emailId, address, phone,documents } = req.body;
  if (!name) {
    throw new Error("name is not valid");
  } else if (name.length < 2 || name.length > 50) {
    throw new Error("FistName should be 3 to 50 Character");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email id not valid");
  } else if (phone && !validator.isMobilePhone(phone, "en-IN")) {
    throw new Error("phone number is not valid");
  } else if (!address || typeof address !== "object") {
    throw new Error("Address is required");
  } else if (!address.city || address.city.trim().length <= 2) {
    throw new Error("City is required and should be at least 2 characters");
  } else if (!address.state || address.state.trim().length <= 2) {
    throw new Error("State is required and should be at least 2 characters");
  } else if (!address.pincode || !/^[0-9]{6}$/.test(address.pincode)) {
    throw new Error("Pincode must be 6 digits");
  } else if (!address.fullAddress || address.fullAddress.length < 10) {
    throw new Error("Full address should be at least 10 characters");
  } else if (documents)
  {
    for (const document of documents) {
      if (!validator.isURL(document)) {
        throw new Error(`Invalid document URL: ${document}`);
      }
    }
  }
};

const validatePetAdoptRegisterData = (req) => {
  const { name,gender,  location, breed, age, documents, adoptStatus,species } = req.body;
  if ((name && name.length < 2) || name.length > 50) {
    throw new Error("FistName should be 3 to 50 Character");
  } else if (age && age.length > 50) {
    throw new Error("Should be less than 50 char");
  } else if (!["dog", "cat", "rabbit", "cow", "other"].includes(species)) {
    throw new Error("This type is not allowed");
  } else if (breed && breed.length > 20) {
    throw new Error("Length should be below 20 char");
  } else if (!["male", "female","Not Sure"].includes(gender)) {
    throw new Error("This gender type is not allowed");
  } else if (!location.city || location.city.trim().length <= 2) {
    throw new Error("City is required and should be at least 2 characters");
  } else if (!location.state || location.state.trim().length <= 2) {
    throw new Error("State is required and should be at least 2 characters");
  } else if (adoptStatus && !["Available","Adopted","Pending"].includes(adoptStatus)){
    throw new Error("Adopt status required");
   } else if (documents) {
    for (const document of documents) {
      if (!validator.isURL(document)) {
        throw new Error(`Invalid document URL: ${document}`);
      }
    }
  }
};

module.exports = {
  validationSignupData,
  validationLoginData,
  validationUpdateUserData,
  validationShelterRegisterData,
  validatePetAdoptRegisterData,
};
