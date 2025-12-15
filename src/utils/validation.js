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
   } else if (documents) {
    for (const document of documents) {
      if (!validator.isURL(document)) {
        throw new Error(`Invalid document URL: ${document}`);
      }
    }
  }
};


const validationlostAndFoundRegisterPetData =(req)=>{
  const{type,petType,breed,color,lastSeenLocation,description,contactNumber}=req.body
if(!["lost","found"].includes(type)){ throw new Error("Should be lost or found");}
else if(!["dog", "cat", "rabbit", "other", "bird"].includes(petType)){throw new Error("Please enter correct pet type");}
else if(breed && breed.length>25){throw new Error ("Should be below 25 char")}
else if(!color || color.length>25){throw new Error ("Should be below 25 char")}
else if(!lastSeenLocation.city || lastSeenLocation.city.length>25){throw new Error ("Should be below 25 char")}
else if(!lastSeenLocation.area || lastSeenLocation.area.length>25){throw new Error ("Should be below 25 char")}
else if(!lastSeenLocation.pincode || lastSeenLocation.pincode.length!==6){throw new Error ("Should be 6 digit")}
else if(!description || description.length>200){throw new Error ("Should be below 200 char")}
else if(!contactNumber ||!validator.isMobilePhone(contactNumber.trim(),"en-IN")){throw new Error ("Should be a valid mob no")}


}

const validationlostAndFoundUpdatePetData=(req)=>{
const ALLOWED_FIELDS=["type","petType","breed","color","lastSeenLocation","description","contactNumber","images"];
const isUpdateAllowed = Object.keys(req.body).every((field) =>
  ALLOWED_FIELDS.includes(field))
if(!isUpdateAllowed) throw new Error("This all fiels are not allowed");
//todo
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
  else if(!contact.phone||!validator.isMobilePhone(contact.phone.trim(),"en-IN")) throw new Error("shoud be 10 digit mob no")
  else if(!contact.email||!validator.isEmail(contact.email.trim())) throw new Error("shoud be a email")
  else if(!address.city||address.city.length>50) throw new Error("shoud be below 50 char")
  else if(!address.state||address.state.length>50) throw new Error("shoud be below 50 char")
  else if(!address.pincode||!address.pincode.length==6) throw new Error("pincode should be 6 digit")
  else if(documents.gstNumber&&!documents.gstNumber.length==15) throw new Error("gst should be 15 char")
  else if(documents.licenceNumber&&documents.licenceNumber.length>50) throw new Error("gst sgould be 15 charnot more than 50 char")
//todo documents.document 
}
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
  else if(contact.phone&&!validator.isMobilePhone(contact.phone.trim(),"en-IN")) throw new Error("shoud be 10 digit mob no")
  else if(contact.email&&!validator.isEmail(contact.email.trim())) throw new Error("shoud be a email")
  else if(address.city&&address.city.length>50) throw new Error("shoud be below 50 char")
  else if(address.state&&address.state.length>50) throw new Error("shoud be below 50 char")
  else if(address.pincode&&!address.pincode.length==6) throw new Error("pincode should be 6 digit")
  else if(documents.gstNumber&&!documents.gstNumber.length==15) throw new Error("gst should be 15 char")
  else if(documents.licenceNumber&&documents.licenceNumber.length>50) throw new Error("gst sgould be 15 charnot more than 50 char")
//todo documents.document 
}

const validationGroomingServiceRegisterData=(req)=>{

}

const validationGroomingServiceUpdateData=(req)=>{

}

module.exports = {
  validationSignupData,
  validationLoginData,
  validationUpdateUserData,
  validationShelterRegisterData,
  validatePetAdoptRegisterData,
  validationlostAndFoundRegisterPetData,
  validationlostAndFoundUpdatePetData,
  validationGroomingServiceProviderSignupData,
  validationGroomingServiceProviderUpdateData,
  validationGroomingServiceRegisterData,
  validationGroomingServiceUpdateData,

};
