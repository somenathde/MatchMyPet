const validator = require("validator");

const validationSignupData = (req) => {
  const { firstName, lastName, emailId, password, address, phone ,role} = req.body;
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
  } else if ((role && !["user","shelter-user"].includes(role))) {
    throw new Error("Invalid Role");
  }
};


const  validationLoginData=(emailId)=> {
 if(!validator.isEmail(emailId)) throw new Error("Invalid Email")
}
module.exports = { validationSignupData, validationLoginData };
