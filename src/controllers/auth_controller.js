const User = require("../models/user_model");
const throwError = require("../utils/throwError")


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

    res.status(200).json({ success: true, cmessage: "Account created successfully", data: user });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

async function handleLogin(req, res) {
  try {
    const clientType = req.headers["x-client-type"];
    validationLoginData(req.body.emailId);
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) throwError("Invalid Credentials", 400);
    else if (!(await comparePassword(req.body.password, user.password))) {
      throwError("Invalid Credentials", 400);
    }
    const token = await generateToken(user._id);
    if (clientType === "app") {
      res.status(200).json({ success: true, message: "app log Successfully", data: token });
    } else {
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      res.status(200).json({ success: true, message: "web log Successfully", data: user });
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

const handleLogout = async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) }).status(200).json({ success: true, message: "logout Successfully", token: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

module.exports = { handleLogin, handleSignup, handleLogout };
