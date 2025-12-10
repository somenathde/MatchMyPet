const express= require('express');
const {handleAdoptPetRegister,handleGetAllAdoptablePet,handleGetOnePetWithId ,handleDeleteOnePetWithId,handleUpdateOnePetWithId,handleAdoptaionStatusOnePetWithId,} = require('../controllers/adopt-pet_Controller');
const router = express.Router({ mergeParams: true })
const {authenticateShelterAdmin} =require("../middlewares/authenticateUser_middleware")
const {authorisedUsertoModifyPetDetails} =require("../middlewares/authorisedUser_middleware")

router.post("/register",authenticateShelterAdmin,handleAdoptPetRegister);
router.get("/:id",handleGetOnePetWithId);
router.delete("/:id",authorisedUsertoModifyPetDetails,handleDeleteOnePetWithId);
router.put("/:id",authorisedUsertoModifyPetDetails,handleUpdateOnePetWithId);
router.patch("/:id/status",authorisedUsertoModifyPetDetails,handleAdoptaionStatusOnePetWithId);
router.get("/",handleGetAllAdoptablePet);




module.exports=router;