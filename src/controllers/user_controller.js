const User = require("../models/user_model");
const { validationUpdateUserData } = require("../utils/validation");
const throwError = require("../utils/throwError")

async function getSingleUser(req, res) {
  try {
    const id = req.params.id;
    const detailOfOtherUser = await User.findById({ _id: id }, { firstName: 1, lastName: 1, pet_owner: 1, _id: 0 })
    if (!detailOfOtherUser) throwError("User Not Found", 404)
    res.status(200).json({ success: true, message: "User Fetched successfully", data: detailOfOtherUser });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.userId;
    const id = req.params.id;
    if (id !== userId) {
      throwError("Unauthorised to delete other user", 403);
    } else {
      const result = await User.findByIdAndDelete({ _id: userId });
      if (!result) throwError("Unknown Error", 404);
      res.cookie("token", null, { expires: new Date(Date.now()) }).status(200).json({ success: true, message: "Deleted Successfully", token: null });
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

const getUserPet = async (req, res) => {
  const id = req.params.id;
  try {
    const userPet = await User.findById(id, { pet_owner: 1, _id: 0 })
    if (!userPet) throwError("Invalid Id", 404)

    res.status(200).json({ success: true, message: "Successfully fetched userpet", data: userPet })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

async function getallUser(req, res) {
  try {
    const allUser = await User.find({}, { firstName: 1, lastName: 1 })
    res.status(200).json({ success: true, message: "Successfully fetched all user", data: allUser })
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }

}

async function updateUser(req, res) {
  try {
    if (req.userId !== req.params.id) throwError("Unauthosised Request, You can't adit other user", 403);
    validationUpdateUserData(req)
    const loggedInUser = await User.findById(req.userId);
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.status(200).json({ success: true, message: "User Update successfully", data: loggedInUser });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}
async function getMyProfile(req, res) {
  try {
    const user = await User.findById(req.userId, {
      firstName: 1,
      lastName: 1,
      emailId: 1,
      phone: 1,
      role: 1,
      address: 1,
      pet_owner: 1
    })
    res.status(200).json({ success: true, message: "User fetched successfully", data: user });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
}

module.exports = {
  getSingleUser,
  deleteUser,
  updateUser,
  getallUser,
  getUserPet,
  getMyProfile
};
