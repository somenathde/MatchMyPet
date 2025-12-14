const User = require("../models/user_model");
const { validationUpdateUserData } = require("../utils/validation");

async function getSingleUser(req, res) {
  try {
    const id = req.params.id;
    const detailOfOtherUser=await User.findById({_id:id},{firstName:1,lastName:1,pet_owner:1,_id:0})
    if(!detailOfOtherUser) throw new Error ("User Not Found")
    res.status(200).json({ message: detailOfOtherUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.userId;
    const id = req.params.id;
    if (id !== userId) {
      throw new Error("Unauthorised to delete other user");
    } else {
      const result = await User.findByIdAndDelete({ _id: userId });
      if (!result) throw new Error("Unknown Error");
      res.cookie("token", null,{expires: new Date(Date.now())}).status(200).json({ message: "Deleted Successfully",token:null });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getUserPet = async (req, res) => {
  const id = req.params.id;
  try {
     const userPet=await User.findById(id,{pet_owner:1 ,_id:0})
     if(!userPet) throw new Error ("Invalid Id")

  res.status(200).json({userPet})
  } catch (error) {
    res.status(400).json({error:error})
  }
};

async function getallUser(req, res) {
  try {
     const allUser=await User.find({},{firstName:1, lastName: 1 })
  res.status(200).json({allUser})
  } catch (error) {
    res.status(400).json({error:error})
  }
 
}

async function updateUser(req, res) {
  try {
    if (req.userId !== req.params.id) throw new Error("Unauthosised Request, You can't adit other user");
    if (!validationUpdateUserData(req)) {
      throw new Error("Selected field edit request not valid");
    }
    const loggedInUser = await User.findById(req.userId);
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.status(200).json({ message: "User Update successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getSingleUser,
  deleteUser,
  updateUser,
  getallUser,
  getUserPet,
};
