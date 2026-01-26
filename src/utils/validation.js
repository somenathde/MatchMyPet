const validator = require("validator");
const throwError = require("./throwError")

const validationSignupData = (req) => {
  const { firstName, lastName, emailId, password, address, phone, role } =
    req.body;
  if (!firstName) {
    throwError("name is not valid", 400);
  } else if (firstName.length < 2 || firstName.length > 50) {
    throwError("FistName should be 3 to 50 Character", 400);
  } else if (lastName && lastName.length > 50) {
    throwError("LastName should be 0-50 Character", 400);
  } else if (!validator.isEmail(emailId)) {
    throwError("email id not valid", 400);
  } else if (!validator.isStrongPassword(password)) {
    throwError("password is not strong", 400);
  } else if (address && address.length > 200) {
    throwError("address should below 200 Character", 400);
  } else if (phone && !validator.isMobilePhone(phone, "en-IN")) {
    throwError("phone number is not valid", 400);
  } else if (role && !["user", "shelter-user"].includes(role)) {
    throwError("Invalid Role", 400);
  }
};

const validationLoginData = (emailId) => {
  if (!validator.isEmail(emailId)) throwError("Invalid Email", 400);
};

const validationUpdateUserData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "phone",
    "address",
    "pet_owner",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  if (!isEditAllowed) throwError("All fields are not allowed", 400)
  const { firstName, lastName, address, phone, pet_owner } = req.body;
  if (!firstName && firstName.length < 2 || firstName.length > 50) {
    throwError("FistName should be 3 to 50 Character", 400);
  } else if (lastName && lastName.length > 50) {
    throwError("LastName should be 0-50 Character", 400);
  } else if (address && address.length > 200) {
    throwError("address should below 200 Character", 400);
  } else if (phone && !validator.isMobilePhone(phone, "en-IN")) {
    throwError("phone number is not valid", 400);
  } else if (pet_owner && !["Yes", "No"].includes(pet_owner)) {
    throwError("Invalid Role", 400);
  }
};

const validationShelterRegisterData = (req) => {
  const { name, emailId, address, phone, documents } = req.body;
  if (!name) {
    throwError("name is not valid", 400);
  } else if (name.length < 2 || name.length > 50) {
    throwError("FistName should be 3 to 50 Character", 400);
  } else if (!validator.isEmail(emailId)) {
    throwError("email id not valid", 400);
  } else if (phone && !validator.isMobilePhone(phone, "en-IN")) {
    throwError("phone number is not valid", 400);
  } else if (!address || typeof address !== "object") {
    throwError("Address is required", 400);
  } else if (!address.city || address.city.trim().length <= 2) {
    throwError("City is required and should be at least 2 characters", 400);
  } else if (!address.state || address.state.trim().length <= 2) {
    throwError("State is required and should be at least 2 characters", 400);
  } else if (!address.pincode || !/^[0-9]{6}$/.test(address.pincode)) {
    throwError("Pincode must be 6 digits", 400);
  } else if (!address.fullAddress || address.fullAddress.length < 10) {
    throwError("Full address should be at least 10 characters", 400);
  } else if (documents) {
    for (const document of documents) {
      if (!validator.isURL(document)) {
        throwError(`Invalid document URL: ${document}`, 400);
      }
    }
  }
};

const validatePetAdoptRegisterData = (req) => {
  const { name, gender, location, breed, age, documents, adoptStatus, species } = req.body;
  if ((name && name.length < 2) || name.length > 50) {
    throwError("FistName should be 3 to 50 Character", 400);
  } else if (age && age.length > 50) {
    throwError("Should be less than 50 char", 400);
  } else if (!["dog", "cat", "rabbit", "cow", "other"].includes(species)) {
    throwError("This type is not allowed", 400);
  } else if (breed && breed.length > 20) {
    throwError("Length should be below 20 char", 400);
  } else if (!["male", "female", "Not Sure"].includes(gender)) {
    throwError("This gender type is not allowed", 400);
  } else if (!location.city || location.city.trim().length <= 2) {
    throwError("City is required and should be at least 2 characters", 400);
  } else if (!location.state || location.state.trim().length <= 2) {
    throwError("State is required and should be at least 2 characters", 400);
  } else if (adoptStatus && !["Available", "Adopted", "Pending"].includes(adoptStatus)) {
    throwError("Adopt status required", 400);
  }
  else if (documents && !Array.isArray(documents)) throw new Error("only array accepted", 400)
  else if (documents && documents.length > 4) throw new Error("max 4 allowed", 400)
  else if (documents) {
    for (const document of documents) {
      if (!validator.isURL(document)) {
        throwError(`Invalid document URL: ${document}`, 400);
      }
    }
  }
};

const validatePetAdoptUpdateData = (req) => {
  const { name, gender, location, breed, age, documents, adoptStatus, species } = req.body;
  if ((name && (name.length < 2) || name.length > 50)) {
    throwError("FistName should be 3 to 50 Character", 400);
  } else if (age && age.length > 50) {
    throwError("Should be less than 50 char", 400);
  } else if (species && !["dog", "cat", "rabbit", "cow", "other"].includes(species)) {
    throwError("This type is not allowed", 400);
  } else if (breed && breed.length > 20) {
    throwError("Length should be below 20 char", 400);
  } else if (gender && !["male", "female", "Not Sure"].includes(gender)) {
    throwError("This gender type is not allowed", 400);
  } else if (location?.city && location.city.trim().length <= 2) {
    throwError("City is required and should be at least 2 characters", 400);
  } else if (location?.state && location.state.trim().length <= 2) {
    throwError("State is required and should be at least 2 characters", 400);
  } else if (adoptStatus && !["Available", "Adopted", "Pending"].includes(adoptStatus)) {
    throwError("Adopt status required", 400);
  }
  else if (documents && !Array.isArray(documents)) throw new Error("only array accepted", 400)
  else if (documents && documents.length > 4) throw new Error("max 4 allowed", 400)
  else if (documents) {
    for (const document of documents) {
      if (!validator.isURL(document)) {
        throwError(`Invalid document URL: ${document}`, 400);
      }
    }
  }
}


const validationlostAndFoundRegisterPetData = (req) => {
  const { type, petType, breed, color, lastSeenLocation, description, contactNumber } = req.body
  if (!["lost", "found"].includes(type)) { throwError("Should be lost or found", 400); }
  else if (!["dog", "cat", "rabbit", "other", "bird"].includes(petType)) { throwError("Please enter correct pet type", 400); }
  else if (breed && breed.length > 25) { throwError("Should be below 25 char", 400) }
  else if (!color || color.length > 25) { throwError("Should be below 25 char", 400) }
  else if (!lastSeenLocation?.city || lastSeenLocation.city.length > 25) { throwError("Should be below 25 char", 400) }
  else if (!lastSeenLocation?.area || lastSeenLocation.area.length > 25) { throwError("Should be below 25 char", 400) }
  else if (!lastSeenLocation?.pincode || lastSeenLocation.pincode.length !== 6) { throwError("Should be 6 digit", 400) }
  else if (!description || description.length > 200) { throwError("Should be below 200 char", 400) }
  else if (!contactNumber || !validator.isMobilePhone(contactNumber.trim(), "en-IN")) { throwError("Should be a valid mob no", 400) }


}

const validationlostAndFoundUpdatePetData = (req) => {
  const ALLOWED_FIELDS = ["breed", "color", "lastSeenLocation", "description", "contactNumber", "images"];
  const isUpdateAllowed = Object.keys(req.body).every((field) =>
    ALLOWED_FIELDS.includes(field))
  if (!isUpdateAllowed) throwError("This all fiels are not allowed", 400);
  const { breed, color, lastSeenLocation, description, contactNumber } = req.body
  if (breed && breed.length > 25) { throwError("Should be below 25 char", 400) }
  if (!color && color.length > 25) { throwError("Should be below 25 char", 400) }
  if (!lastSeenLocation?.city && lastSeenLocation.city.length > 25) { throwError("Should be below 25 char", 400) }
  if (!lastSeenLocation?.area && lastSeenLocation.area.length > 25) { throwError("Should be below 25 char", 400) }
  if (!lastSeenLocation?.pincode && !/^\d{6}$/.test(address.pincode)) { throwError("Should be 6 digit", 400) }
  if (!description && description.length > 200) { throwError("Should be below 200 char", 400) }
  if (!contactNumber && !validator.isMobilePhone(contactNumber.trim(), "en-IN")) { throwError("Should be a valid mob no", 400) }
}

const validationGroomingServiceProviderSignupData = (req) => {
  const allowed = ["providerType", "businessName", "description", "contact", "address", "documents"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if (!isAllowed) throwError("All this fields are not valid", 400)
  const { providerType, businessName, description, contact, address, documents } = req.body
  if (!["individual", "company"].includes(providerType)) throwError("shoud be individual or company", 400)
  else if (!businessName || businessName.length > 120) throwError("shoud be below 120 char", 400)
  else if (!description || description.length > 120) throwError("shoud be below 1000 char", 400)
  else if (!contact?.phone || !validator.isMobilePhone(contact.phone.trim(), "en-IN")) throwError("shoud be 10 digit mob no", 400)
  else if (!contact.email || !validator.isEmail(contact.email.trim())) throwError("shoud be a email", 400)
  else if (!address?.city || address.city.length > 50) throwError("shoud be below 50 char", 400)
  else if (!address?.state || address.state.length > 50) throwError("shoud be below 50 char", 400)
  else if (!address?.pincode || !/^\d{6}$/.test(address.pincode)) throwError("pincode should be 6 digit", 400)
  else if (documents?.gstNumber && !documents.gstNumber.length == 15) throwError("gst should be 15 char", 400)
  else if (documents?.licenceNumber && documents.licenceNumber.length > 50) throwError("gst sgould be 15 charnot more than 50 char", 400)
  else if (documents?.document && !Array.isArray(documents.document)) throwError("only array accepted", 400)
  else if (documents?.document && documents.document.length > 4) throwError("max 4 allowed", 400)
  else if (documents?.document) {
    for (const item of documents?.document) {
      if (!validator.isURL(item)) throwError(`Invalid document URL: ${item}`, 400);
    }
  }
}
const validationGroomingServiceProviderUpdateData = (req) => {
  const allowed = ["providerType", "businessName", "description", "contact", "address", "documents"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if (!isAllowed) throwError("All this fields are not valid", 400)
  const { providerType, businessName, description, contact, address, documents } = req.body
  if (providerType && !["individual", "company"].includes(providerType)) throwError("shoud be individual or company", 400)
  else if (businessName && businessName.length > 120) throwError("shoud be below 120 char", 400)
  else if (description && description.length > 120) throwError("shoud be below 1000 char", 400)
  else if (contact?.email && !validator.isEmail(contact.email.trim())) throwError("shoud be a email", 400)
  else if (address?.city && address.city.length > 50) throwError("shoud be below 50 char", 400)
  else if (address?.state && address.state.length > 50) throwError("shoud be below 50 char", 400)
  else if (address?.pincode && !/^\d{6}$/.test(address.pincode)) throwError("pincode should be 6 digit", 400)
  else if (documents?.gstNumber && !documents.gstNumber.length == 15) throwError("gst should be 15 char", 400)
  else if (documents?.licenceNumber && documents.licenceNumber.length > 50) throwError("gst sgould be 15 charnot more than 50 char", 400)
  else if (documents?.document && !Array.isArray(documents.document)) throwError("only array accepted", 400)
  else if (documents?.document && documents.document.length > 4) throwError("max 4 allowed", 400)
  else if (documents?.document) {
    for (const item of documents.document) {
      if (!validator.isURL(item)) throwError(`Invalid document URL: ${item}`, 400);
    }
  }
}

const validationGroomingServiceRegisterData = (req) => {
  const allowed = ["serviceName", "description", "pricing", "images", "isActive"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if (!isAllowed) throwError("All this fields are not valid", 400)
  const { serviceName, description, pricing, images, isActive } = req.body
  if (!serviceName || serviceName.length > 100) throwError("shoud be below 100 char", 400)
  else if (!description || description.length > 1000) throwError("shoud be below 1000 char", 400)
  else if (pricing?.basePrice === undefined || pricing.basePrice < 0) throwError("shoud be minimum 0", 400)
  else if (pricing?.currency && (!["INR", "USD"].includes(pricing.currency))) throwError("sholud be USD/INR", 400)
  else if (images && (!Array.isArray(images) || images.length > 10)) throwError("max to allowed", 400)
  else if (isActive && !validator.isBoolean(isActive)) throwError("only boolean acepected", 400)
}

const validationGroomingServiceUpdateData = (req) => {
  const allowed = ["serviceName", "description", "pricing", "images", "isActive"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if (!validator.isMongoId(req.params.serviceId)) throwError("not a valid Service id", 400)
  if (!isAllowed) throwError("All this fields are not valid", 400)
  const { serviceName, description, pricing, images, isActive } = req.body
  if (!serviceName && serviceName.length > 100) throwError("shoud be below 100 char", 400)
  else if (!description && description.length > 1000) throwError("shoud be below 1000 char", 400)
  else if (pricing?.basePrice !== undefined && pricing.basePrice < 0) throwError("shoud be minimum 0", 400)
  else if (pricing?.currency && (!["INR", "USD"].includes(pricing.currency))) throwError("sholud be USD/INR", 400)
  else if (images && (!Array.isArray(images) || images.length > 10)) throwError("max to allowed", 400)
  else if (isActive && !validator.isBoolean(isActive)) throwError("only boolean acepected", 400)
}

const validateRegisterStoreData = (req) => {
  const allowed = ["name", "businessName", "description", "logo", "isActive", "contactInfo", "address", "documents"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if (!isAllowed) throw new Error("All this fields are not valid", 400)

  const { name, businessName, description, logo, isActive, contactInfo, address, documents } = req.body;
  if (!name || (name.length < 3 || name.length > 100)) throwError("shoud be 3 to 100 char", 400)
  if (!businessName || (businessName.length < 3 || businessName.length > 100)) throwError("shoud be 3 to 100 char", 400)
  if (description && description.length > 200) throwError("shoud be below 200 char", 400)
  if (logo && logo.length > 200) throwError("logo max 200 char", 400)
  if (contactInfo?.emailId && (!validator.isEmail(contactInfo.emailId) || contactInfo.emailId.length > 100)) throwError("Shoud be email and below 100 char", 400)
  if (isActive !== undefined && !validator.isBoolean(isActive)) throwError("only boolean acepected", 400)
  if (contactInfo?.phone && !validator.isMobilePhone(contactInfo.phone)) throwError("Shoud be valid mob no", 400)
  if (address?.street && address.street.length > 50) throwError("max 50 char to allowed", 400)
  if (!address?.city || address.city.length < 2 || address.city.length > 50) throwError("max 2-50 char to allowed for city", 400)
  if (address?.state && address.state.length > 50) throwError("max 50 char to allowed for state", 400)
  if (!address?.pincode || !/^\d{6}$/.test(address.pincode)) throwError("pincode should be 6 digit", 400)
  if (address?.country && address.country.length > 50) throwError("max 50 char to allowed for country", 400)
  if (documents?.gstNumber && documents.gstNumber.length !== 15) throwError("GSt should be 15 char", 400)
  if (documents?.licenseNumber && documents.licenseNumber.length > 50) throwError("GSt should be below 50 char", 400)
  if (documents?.document && !Array.isArray(documents.document)) throwError("only array accepted", 400)
  if (documents?.document && documents.document.length > 4) throwError("max 4 allowed", 400)
  if (documents?.document) {
    for (const item of documents.document) {
      if (!validator.isURL(item)) throwError(`Invalid document URL: ${item}`, 400)
    }
  }
}
const validateUpdateStoreData = (req) => {
  const allowed = ["name", "businessName", "description", "logo", "isActive", "contactInfo", "address", "documents"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if (!isAllowed) throwError("All this fields are not valid", 400)

  const { name, businessName, description, logo, isActive, contactInfo, address, documents } = req.body;
  if (name && (name.length < 3 || name.length > 100)) throwError("shoud be 3 to 100 char", 400)
  if (businessName && ((businessName.length < 3 || businessName.length > 100))) throwError("shoud be 3 to 100 char", 400)
  if (description && description.length > 200) throwError("shoud be below 200 char", 400)
  if (logo && logo.length > 200) throwError("logo max 200 char", 400)
  if (contactInfo?.emailId && (!validator.isEmail(contactInfo.emailId) || contactInfo.emailId.length > 100)) throwError("Shoud be email and below 100 char", 400)
  if (isActive !== undefined && !validator.isBoolean(isActive)) throwError("only boolean acepected", 400)
  if (contactInfo?.phone && !validator.isMobilePhone(contactInfo.phone)) throwError("Shoud be valid mob no", 400)
  if (address?.street && address.street.length > 50) throwError("max 50 char to allowed", 400)
  if (address?.city && (address.city.length < 2 || address.city.length > 50)) throwError("max 2-50 char to allowed for city", 400)
  if (address?.state && address.state.length > 50) throwError("max 50 char to allowed for state", 400)
  if (address?.pincode && !/^\d{6}$/.test(address.pincode)) throwError("pincode should be 6 digit", 400)
  if (address?.country && address.country.length > 50) throwError("max 50 char to allowed for country", 400)
  if (documents?.gstNumber && documents.gstNumber.length !== 15) throwError("GSt should be 15 char", 400)
  if (documents?.licenseNumber && documents.licenseNumber.length > 50) throwError("GSt should be below 50 char", 400)
  if (documents?.document && !Array.isArray(documents.document)) throwError("only array accepted", 400)
  if (documents?.document && documents.document.length > 4) throwError("max 4 allowed")
  if (documents?.document) {
    for (const item of documents.document) {
      if (!validator.isURL(item)) throwError(`Invalid document URL: ${item}`, 400);
    }

  }
}

const validateNewProductRegistration = (req) => {
  const allowed = ["category", "name", "description", "MRP", "price", "images", "storeId", "stock", "isActive"];
  const isallowed = Object.keys(req.body).every((field) => allowed.includes(field));
  if (!isallowed) throwError("All field are not allowed", 400)

  const { category, name, description, MRP, price, images, storeId, stock, isActive } = req.body;
  if (!storeId) throwError("storeId required", 400);
  if (!validator.isMongoId(storeId)) throwError("not a valid Mongo Id", 400)
  if (String(storeId) !== req.params.sid) throwError("Storeid not valid", 400)
  if (category === undefined || !["food", "toys", "accessories", "medicine"].includes(category)) throwError("shoud be valid category", 400)
  if (!name || name.length < 3 || name.length > 100) throwError("shoud be 3 to 100 char", 400)
  if (description && description.length > 800) throwError("shoud be below 800 char", 400)
  if (!MRP || typeof MRP !== "number" || MRP < 1) throwError("Minimum value 1", 400)
  if (price === undefined || typeof price !== "number" || price < 0) throwError("Price should be minimum 0", 400);
  if (price > MRP) throwError("Price should be less than or equal MRP", 400)
  if (images && !Array.isArray(images)) throwError("should be array", 400)
  if (images && images.length > 10) throwError("only 10 image allowed", 400)
  if (images) { for (const image of images) { if (!validator.isURL(image)) throwError("not a valid url", 400) } }
  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) throwError("minimum stock 0 or Number", 400)
  if (isActive !== undefined && typeof isActive !== "boolean") throwError("only boolean acepected", 400)
}

const validateUpdateProductData = (req) => {
  const allowed = ["category", "name", "description", "MRP", "price", "images", "stock", "isActive"];
  const isAllowed = Object.keys(req.body).every((field) => allowed.includes(field));
  if (!isAllowed) throwError("All field are not allowed", 400)
  const { category, name, description, MRP, price, images, stock, isActive } = req.body;
  if (category !== undefined && !["food", "toys", "accessories", "medicine"].includes(category)) throwError("shoud be valid category", 400)
  if (name && (name.length < 3 || name.length > 100)) throwError("shoud be 3 to 100 char", 400)
  if (description && description.length > 800) throwError("shoud be below 800 char", 400)
  if (MRP !== undefined && (typeof MRP !== "number" || MRP < 1)) throwError("MRP Minimum value 1 or Number", 400)
  if (price !== undefined && (typeof price !== "number" || price < 0)) throwError("Price should be more than or equal 0", 400)
  if (price !== undefined && MRP !== undefined && price > MRP) throwError("Price should be less than or equal MRP", 400)
  if (images && !Array.isArray(images)) throwError("image should be in array", 400)
  if (images && images.length > 10) throwError("only 10 image allowed", 400)
  if (images) { for (const image of images) { if (!validator.isURL(image)) throwError("invalid url", 400) } }
  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) throwError("minimum stock 0 or Number", 400)
  if (isActive !== undefined && typeof isActive !== "boolean") throwError("only boolean acepected", 400)
}


const validationOrderData = (req) => {
  if (!req.params.sid || !validator.isMongoId(req.params.sid)) throwError("not valid sore id", 400)
  const { items, address, paymentMethod } = req.body;
  if (!Array.isArray(items) || items.length < 1) throwError("Item should be array, and not empty", 400);
  items.forEach((item, index) => {
    if (!item.productId || !validator.isMongoId(item.productId)) throwError(`Invalid ProductId: Not A Mongo ID,at index${index + 1}`, 400);
    if (typeof item.qty !== "number" || item.qty < 1) throwError(`Qty shoud be number or min 1, at index ${index + 1}`, 400);
  })
  if (!address || typeof address !== "object") throwError("address required", 400);
  if (!address?.addressLine1 || address.addressLine1.length < 2 || address.addressLine1.length > 100) throwError("addressLine1 shoud be 2 to 100 char", 400);
  if (address?.addressLine2 && address.addressLine2.length > 100) throwError("addressLine2 shoud be 2 to 100 char", 400);
  if (!address?.phone || !validator.isMobilePhone(address.phone, "en-IN")) throwError("Shoud be valid mob no", 400)
  if (address?.street && address.street.length > 100) throwError("max 100 char to allowed", 400)
  if (!address?.city || (address.city.length < 2 || address.city.length > 50)) throwError("max 2-50 char to allowed for city", 400)
  if (!address?.state || address.state.length > 100) throwError("max 100 char to allowed for state", 400)
  if (!address?.pincode || !/^\d{6}$/.test(address.pincode)) throwError("pincode should be 6 digit", 400)
  if (address?.country && address.country.length > 100) throwError("max 100 char to allowed for country", 400)
  if (!["cod", "razorpay"].includes(paymentMethod)) throwError("Payment method not allowed", 400)
}

module.exports = {
  validationSignupData,
  validationLoginData,
  validationUpdateUserData,
  validationShelterRegisterData,
  validatePetAdoptRegisterData,
  validatePetAdoptUpdateData,
  validationlostAndFoundRegisterPetData,
  validationlostAndFoundUpdatePetData,
  validationGroomingServiceProviderSignupData,
  validationGroomingServiceProviderUpdateData,
  validationGroomingServiceRegisterData,
  validationGroomingServiceUpdateData,
  validateRegisterStoreData,
  validateUpdateStoreData,
  validateNewProductRegistration,
  validateUpdateProductData,
  validationOrderData,
};
