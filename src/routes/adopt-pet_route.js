const express= require('express');
const {handleAdoptPetRegister,handleGetAllAdoptablePet,handleGetOnePetWithId ,handleDeleteOnePetWithId,handleUpdateOnePetWithId,handleAdoptaionStatusOnePetWithId,} = require('../controllers/adopt-pet_Controller');
const router = express.Router({ mergeParams: true })
const {authenticateShelterAdmin,authenticateUser,} =require("../middlewares/authenticateUser_middleware")
const {authorisedUsertoModifyPetDetails} =require("../middlewares/authorisedUser_middleware")

router.post("/register",authenticateUser,authenticateShelterAdmin,handleAdoptPetRegister);
router.get("/:id",authenticateUser,handleGetOnePetWithId);
router.delete("/:id",authenticateUser,authorisedUsertoModifyPetDetails,handleDeleteOnePetWithId);
router.put("/:id",authenticateUser,authorisedUsertoModifyPetDetails,handleUpdateOnePetWithId);
router.patch("/:id/status",authenticateUser,authorisedUsertoModifyPetDetails,handleAdoptaionStatusOnePetWithId);
router.get("/",handleGetAllAdoptablePet);




module.exports=router;