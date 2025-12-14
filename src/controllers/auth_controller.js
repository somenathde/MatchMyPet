const User = require("../models/user_model");


const {
  createPassword,
  comparePassword,
  generateToken,
} = require("../services/auth_Service");
const {
  validationSignupData,
  validationLoginData,
} = require("../utils/validation");
async function handleSignup(req, res) {
  try {
    validationSignupData(req);
    const { firstName, lastName, emailId, role, phone, address, pet_owner } =
      req.body;
    const passwordHash = await createPassword(req.body.password);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      address,
      role,
      phone,
      pet_owner,
    });

    await user.save();

    res.status(200).json("Account created Successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function handleLogin(req, res) {
  try {
    const clientType = req.headers["x-client-type"];
    validationLoginData(req.body.emailId);
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) throw new Error("Invalid Credentials");
    else if (!(await comparePassword(req.body.password, user.password))) {
      throw new Error("Invalid Credentials");
    }
    const token = await generateToken(user._id);
    if (clientType === "app") {
      res.status(200).json({ message: "app log Successfully", token });
    } else {
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      res.status(200).json({ message: "web log Successfully" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const handleLogout=async(req,res)=>{
try {
      res.cookie("token", null,{expires: new Date(Date.now())}).status(200).json({ message: "logout Successfully",token:null });
} catch (error) {
   res.status(500).json({ error: err.message });
}
}

module.exports = { handleLogin, handleSignup, handleLogout };
