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
    "address",
    "pet_owner",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  if(!isEditAllowed) throw new Error("All fields are not allowed")
    const {firstName, lastName,  address, phone,pet_owner} =req.body;
  if (!firstName && firstName.length < 2 || firstName.length > 50) {
    throw new Error("FistName should be 3 to 50 Character");
  } else if (lastName && lastName.length > 50) {
    throw new Error("LastName should be 0-50 Character");
  } else if (address && address.length > 200) {
    throw new Error("address should below 200 Character");
  } else if (phone && !validator.isMobilePhone(phone, "en-IN")) {
    throw new Error("phone number is not valid");
  } else if (pet_owner && !["Yes", "No"].includes(pet_owner)) {
    throw new Error("Invalid Role");
  }
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
   }
    else if(documents&&!Array.isArray(documents)) throw new Error("only array accepted")
    else if(documents && documents.length>4) throw new Error("max 4 allowed") 
    else if (documents) {
    for (const document of documents) {
      if (!validator.isURL(document)) {
        throw new Error(`Invalid document URL: ${document}`);
      }
    }
  }
};

const validatePetAdoptUpdateData=(req)=>{
    const { name,gender,  location, breed, age, documents, adoptStatus,species } = req.body;
  if ((name && (name.length < 2) || name.length > 50)) {
    throw new Error("FistName should be 3 to 50 Character");
  } else if (age && age.length > 50) {
    throw new Error("Should be less than 50 char");
  } else if (species && !["dog", "cat", "rabbit", "cow", "other"].includes(species)) {
    throw new Error("This type is not allowed");
  } else if (breed && breed.length > 20) {
    throw new Error("Length should be below 20 char");
  } else if (gender && !["male", "female","Not Sure"].includes(gender)) {
    throw new Error("This gender type is not allowed");
  } else if (location?.city && location.city.trim().length <= 2) {
    throw new Error("City is required and should be at least 2 characters");
  } else if (location?.state && location.state.trim().length <= 2) {
    throw new Error("State is required and should be at least 2 characters");
  } else if (adoptStatus && !["Available","Adopted","Pending"].includes(adoptStatus)){
    throw new Error("Adopt status required");
   } 
    else if(documents&&!Array.isArray(documents)) throw new Error("only array accepted")
    else if(documents && documents.length>4) throw new Error("max 4 allowed")
    else if (documents) {
   for (const document of documents) {
      if (!validator.isURL(document)) {
        throw new Error(`Invalid document URL: ${document}`);
      }
    }
  }
}


const validationlostAndFoundRegisterPetData =(req)=>{
  const{type,petType,breed,color,lastSeenLocation,description,contactNumber}=req.body
if(!["lost","found"].includes(type)){ throw new Error("Should be lost or found");}
else if(!["dog", "cat", "rabbit", "other", "bird"].includes(petType)){throw new Error("Please enter correct pet type");}
else if(breed && breed.length>25){throw new Error ("Should be below 25 char")}
else if(!color || color.length>25){throw new Error ("Should be below 25 char")}
else if(!lastSeenLocation?.city || lastSeenLocation.city.length>25){throw new Error ("Should be below 25 char")}
else if(!lastSeenLocation?.area || lastSeenLocation.area.length>25){throw new Error ("Should be below 25 char")}
else if(!lastSeenLocation?.pincode || lastSeenLocation.pincode.length!==6){throw new Error ("Should be 6 digit")}
else if(!description || description.length>200){throw new Error ("Should be below 200 char")}
else if(!contactNumber ||!validator.isMobilePhone(contactNumber.trim(),"en-IN")){throw new Error ("Should be a valid mob no")}


}

const validationlostAndFoundUpdatePetData=(req)=>{
const ALLOWED_FIELDS=["breed","color","lastSeenLocation","description","contactNumber","images"];
const isUpdateAllowed = Object.keys(req.body).every((field) =>
  ALLOWED_FIELDS.includes(field))
if(!isUpdateAllowed) throw new Error("This all fiels are not allowed");
  const{breed,color,lastSeenLocation,description,contactNumber}=req.body
 if(breed && breed.length>25){throw new Error ("Should be below 25 char")}
 if(!color && color.length>25){throw new Error ("Should be below 25 char")}
 if(!lastSeenLocation?.city && lastSeenLocation.city.length>25){throw new Error ("Should be below 25 char")}
 if(!lastSeenLocation?.area && lastSeenLocation.area.length>25){throw new Error ("Should be below 25 char")}
 if(!lastSeenLocation?.pincode && !/^\d{6}$/.test(address.pincode)){throw new Error ("Should be 6 digit")}
 if(!description && description.length>200){throw new Error ("Should be below 200 char")}
 if(!contactNumber &&!validator.isMobilePhone(contactNumber.trim(),"en-IN")){throw new Error ("Should be a valid mob no")}
}

const validationGroomingServiceProviderSignupData=(req)=>{
  const allowed=["providerType", "businessName", "description","contact","address","documents"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if(!isAllowed) throw new Error("All this fields are not valid")
  const{providerType, businessName, description,contact,address,documents}=req.body
  if(!["individual", "company"].includes(providerType)) throw new Error("shoud be individual or company")
    else if(!businessName||businessName.length>120) throw new Error("shoud be below 120 char")
  else if(!description||description.length>120) throw new Error("shoud be below 1000 char")
  else if(!contact?.phone||!validator.isMobilePhone(contact.phone.trim(),"en-IN")) throw new Error("shoud be 10 digit mob no")
  else if(!contact.email||!validator.isEmail(contact.email.trim())) throw new Error("shoud be a email")
  else if(!address?.city||address.city.length>50) throw new Error("shoud be below 50 char")
  else if(!address?.state||address.state.length>50) throw new Error("shoud be below 50 char")
  else if(!address?.pincode||!/^\d{6}$/.test(address.pincode)) throw new Error("pincode should be 6 digit")
  else if(documents?.gstNumber&&!documents.gstNumber.length==15) throw new Error("gst should be 15 char")
  else if(documents?.licenceNumber&&documents.licenceNumber.length>50) throw new Error("gst sgould be 15 charnot more than 50 char")
  else if(documents?.document&&!Array.isArray(documents.document)) throw new Error("only array accepted")
  else if(documents?.document && documents.document.length>4) throw new Error("max 4 allowed")
  else if (documents?.document) {
    for (const item of documents?.document) {
      if (!validator.isURL(item))throw new Error(`Invalid document URL: ${item}`);
    }
}}
const validationGroomingServiceProviderUpdateData=(req)=>{
  const allowed=["providerType", "businessName", "description","contact","address","documents"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if(!isAllowed) throw new Error("All this fields are not valid")
  const{providerType, businessName, description,contact,address,documents}=req.body
  if(providerType && !["individual", "company"].includes(providerType)) throw new Error("shoud be individual or company")
    else if(businessName && businessName.length>120) throw new Error("shoud be below 120 char")
  else if(description&&description.length>120) throw new Error("shoud be below 1000 char")
  else if(contact?.email&&!validator.isEmail(contact.email.trim())) throw new Error("shoud be a email")
  else if(address?.city&&address.city.length>50) throw new Error("shoud be below 50 char")
  else if(address?.state&&address.state.length>50) throw new Error("shoud be below 50 char")
  else if(address?.pincode&&!/^\d{6}$/.test(address.pincode)) throw new Error("pincode should be 6 digit")
  else if(documents?.gstNumber&&!documents.gstNumber.length==15) throw new Error("gst should be 15 char")
  else if(documents?.licenceNumber&&documents.licenceNumber.length>50) throw new Error("gst sgould be 15 charnot more than 50 char")
  else if(documents?.document&&!Array.isArray(documents.document)) throw new Error("only array accepted")
  else if(documents?.document && documents.document.length>4) throw new Error("max 4 allowed")
  else if (documents?.document) {
    for (const item of documents.document) {
      if (!validator.isURL(item))throw new Error(`Invalid document URL: ${item}`);
    }
}}

const validationGroomingServiceRegisterData=(req)=>{
const allowed=["serviceName", "description","pricing","images","isActive"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if(!isAllowed) throw new Error("All this fields are not valid")
  const{ serviceName, description,pricing,images,isActive}=req.body
  if(!serviceName || serviceName.length>100) throw new Error("shoud be below 100 char")
  else if(!description||description.length>1000) throw new Error("shoud be below 1000 char")
  else if(pricing?.basePrice===undefined||pricing.basePrice<0) throw new Error("shoud be minimum 0")
  else if(pricing?.currency&&(!["INR","USD"].includes(pricing.currency))) throw new Error("sholud be USD/INR")
  else if(images&&(!Array.isArray(images)||images.length>10)) throw new Error("max to allowed")
  else if(isActive&&!validator.isBoolean(isActive)) throw new Error("only boolean acepected")
}

const validationGroomingServiceUpdateData=(req)=>{
const allowed=["serviceName", "description","pricing","images","isActive"]
  const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if(!validator.isMongoId(req.params.serviceId))throw new Error("not a valid Service id")
  if(!isAllowed) throw new Error("All this fields are not valid")
  const{ serviceName, description,pricing,images,isActive}=req.body
  if(!serviceName && serviceName.length>100) throw new Error("shoud be below 100 char")
  else if(!description&&description.length>1000) throw new Error("shoud be below 1000 char")
  else if(pricing?.basePrice!==undefined&&pricing.basePrice<0) throw new Error("shoud be minimum 0")
  else if(pricing?.currency&&(!["INR","USD"].includes(pricing.currency))) throw new Error("sholud be USD/INR")
  else if(images&&(!Array.isArray(images)||images.length>10)) throw new Error("max to allowed")
  else if(isActive&&!validator.isBoolean(isActive)) throw new Error("only boolean acepected")
}

const validateRegisterStoreData= (req)=>{
  const allowed=["name","businessName", "description","logo","isActive","contactInfo","address","documents"]
const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if(!isAllowed) throw new Error("All this fields are not valid")

  const{ name,businessName, description,logo,isActive,contactInfo,address,documents}=req.body;
  if(!name ||(name.length<3 || name.length>100)) throw new Error("shoud be 3 to 100 char")
  if(!businessName ||(businessName.length<3 || businessName.length>100)) throw new Error("shoud be 3 to 100 char")
  if(description&&description.length>200) throw new Error("shoud be below 200 char")
  if(logo&&logo.length>200) throw new Error("logo max 200 char")
  if(contactInfo?.emailId&&(!validator.isEmail(contactInfo.emailId) || contactInfo.emailId.length>100)) throw new Error("Shoud be email and below 100 char")
  if(isActive !==undefined&&!validator.isBoolean(isActive)) throw new Error("only boolean acepected")
  if(contactInfo?.phone && !validator.isMobilePhone(contactInfo.phone) ) throw new Error("Shoud be valid mob no")
  if(address?.street && address.street.length>50) throw new Error("max 50 char to allowed")
  if(!address?.city || address.city.length<2 ||address.city.length>50) throw new Error("max 2-50 char to allowed for city")
  if(address?.state && address.state.length>50) throw new Error("max 50 char to allowed for state")
  if(!address?.pincode || !/^\d{6}$/.test(address.pincode)) throw new Error("pincode should be 6 digit")
  if(address?.country && address.country.length>50) throw new Error("max 50 char to allowed for country")
  if(documents?.gstNumber && documents.gstNumber.length!==15) throw new Error("GSt should be 15 char")
  if(documents?.licenseNumber && documents.licenseNumber.length>50) throw new Error("GSt should be below 50 char")
  if(documents?.document&&!Array.isArray(documents.document)) throw new Error("only array accepted")
  if(documents?.document && documents.document.length>4) throw new Error("max 4 allowed")
  if (documents?.document) {
    for (const item of documents.document) {
      if (!validator.isURL(item))throw new Error(`Invalid document URL: ${item}`);
    }
}}
const validateUpdateStoreData=(req)=>{
  const allowed=["name","businessName", "description","logo","isActive","contactInfo","address","documents"]
const isAllowed = Object.keys(req.body).every((field) =>
    allowed.includes(field)
  );
  if(!isAllowed) throw new Error("All this fields are not valid")

  const{ name,businessName, description,logo,isActive,contactInfo,address,documents}=req.body;
  if(name &&(name.length<3 || name.length>100)) throw new Error("shoud be 3 to 100 char")
  if(businessName &&((businessName.length<3 || businessName.length>100))) throw new Error("shoud be 3 to 100 char")
  if(description&&description.length>200) throw new Error("shoud be below 200 char")
  if(logo&&logo.length>200) throw new Error("logo max 200 char")
  if(contactInfo?.emailId&&(!validator.isEmail(contactInfo.emailId) || contactInfo.emailId.length>100)) throw new Error("Shoud be email and below 100 char")
  if(isActive!==undefined&&!validator.isBoolean(isActive)) throw new Error("only boolean acepected")
  if(contactInfo?.phone && !validator.isMobilePhone(contactInfo.phone) ) throw new Error("Shoud be valid mob no")
  if(address?.street && address.street.length>50) throw new Error("max 50 char to allowed")
  if(address?.city &&( address.city.length<2 ||address.city.length>50)) throw new Error("max 2-50 char to allowed for city")
  if(address?.state && address.state.length>50) throw new Error("max 50 char to allowed for state")
  if(address?.pincode && !/^\d{6}$/.test(address.pincode)) throw new Error("pincode should be 6 digit")
  if(address?.country && address.country.length>50) throw new Error("max 50 char to allowed for country")
  if(documents?.gstNumber && documents.gstNumber.length!==15) throw new Error("GSt should be 15 char")
  if(documents?.licenseNumber && documents.licenseNumber.length>50) throw new Error("GSt should be below 50 char")
  if(documents?.document&&!Array.isArray(documents.document)) throw new Error("only array accepted")
  if(documents?.document && documents.document.length>4) throw new Error("max 4 allowed")
  if (documents?.document) {
    for (const item of documents.document) {
      if (!validator.isURL(item))throw new Error(`Invalid document URL: ${item}`);
    }

}}

const validateNewProductRegistration=(req)=>{
const allowed=["category","name","description","MRP","price","images","storeId","stock","isActive"];
const isallowed=Object.keys(req.body).every((field)=>allowed.includes(field));
if(!isallowed) throw new Error("All field are not allowed")
  
const{category,name,description,MRP,price,images,storeId,stock,isActive}=req.body;
  if(!storeId)throw new Error("storeId required");
  if(!validator.isMongoId(storeId) ) throw new Error("not a valid Mongo Id")
  if(String(storeId)!==req.params.sid) throw new Error("Storeid not valid")
  if(category===undefined || !["food",  "toys",  "accessories",  "medicine"].includes(category)) throw new Error("shoud be valid category")
  if(!name || name.length<3 || name.length>100) throw new Error("shoud be 3 to 100 char")
  if(description&&description.length>800) throw new Error("shoud be below 800 char")
  if(!MRP||typeof MRP!=="number" || MRP<1) throw new Error("Minimum value 1")
  if(price===undefined||typeof price!=="number"||price<0) throw new Error("Price should be minimum 0");
  if(price>MRP)throw new Error("Price should be less than or equal MRP")
  if(images&&!Array.isArray(images)) throw new Error("should be array")
  if(images&&images.length>10) throw new Error("only 10 image allowed")
  if(images){ for (const image of images){if(!validator.isURL(image))throw new Error("not a valid url")}}
  if(stock!==undefined&&(typeof stock!=="number" || stock<0))  throw new Error("minimum stock 0 or Number")
  if(isActive!==undefined&&typeof isActive!=="boolean") throw new Error("only boolean acepected")
}

const validateUpdateProductData=(req)=>{
const allowed=["category","name","description","MRP","price","images","stock","isActive"];
const isAllowed=Object.keys(req.body).every((field)=>allowed.includes(field));
if(!isAllowed) throw new Error("All field are not allowed")
const{category,name,description,MRP,price,images,stock,isActive}=req.body;
  if(category!==undefined && !["food",  "toys",  "accessories",  "medicine"].includes(category)) throw new Error("shoud be valid category")
  if(name && (name.length<3 || name.length>100)) throw new Error("shoud be 3 to 100 char")
  if(description&&description.length>800) throw new Error("shoud be below 800 char")
  if(MRP!==undefined&&(typeof MRP !=="number" || MRP<1)) throw new Error("MRP Minimum value 1 or Number")
  if(price!==undefined&&(typeof price !=="number" || price<0)) throw new Error("Price should be more than or equal 0")
  if(price!==undefined && MRP!==undefined &&price>MRP)throw new Error("Price should be less than or equal MRP")
  if(images&&!Array.isArray(images)) throw new Error("image should be in array")
  if(images&&images.length>10) throw new Error("only 10 image allowed")
  if(images){ for (const image of images){if(!validator.isURL(image))throw new Error("invalid url")}}
  if(stock!==undefined&&(typeof stock!=="number" || stock<0))  throw new Error("minimum stock 0 or Number")
  if(isActive!==undefined&&typeof isActive!=="boolean") throw new Error("only boolean acepected")
}


const validationOrderData=(req)=>{
  if(!req.params.sid || !validator.isMongoId(req.params.sid)) throw new Error ("not valid sore id")
  const{items,address,paymentMethod}=req.body;
  if(!Array.isArray(items)||items.length<1) throw new Error("Item should be array, and not empty");
  items.forEach((item,index)=>{
    if(!item.productId || !validator.isMongoId(item.productId))throw new Error(`Invalid ProductId: Not A Mongo ID,at index${index+1}`);
  if(typeof item.qty!=="number" || item.qty<1) throw new Error (`Qty shoud be number or min 1, at index ${index+1}`);
  })
  if(!address || typeof address!=="object")throw new Error ("address required");
  if(!address?.addressLine1 ||address.addressLine1.length<2 || address.addressLine1.length>100  )throw new Error ("addressLine1 shoud be 2 to 100 char");
  if(address?.addressLine2 &&  address.addressLine2.length>100  )throw new Error ("addressLine2 shoud be 2 to 100 char");
  if(!address?.phone || !validator.isMobilePhone(address.phone,"en-IN") ) throw new Error("Shoud be valid mob no")
  if(address?.street && address.street.length>100) throw new Error("max 100 char to allowed")
  if(!address?.city ||( address.city.length<2 ||address.city.length>50)) throw new Error("max 2-50 char to allowed for city")
  if(!address?.state || address.state.length>100) throw new Error("max 100 char to allowed for state")
  if(!address?.pincode || !/^\d{6}$/.test(address.pincode)) throw new Error("pincode should be 6 digit")
  if(address?.country && address.country.length>100) throw new Error("max 100 char to allowed for country")
  if(!["cod","razorpay"].includes(paymentMethod)) throw new Error("Payment method not allowed")
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
