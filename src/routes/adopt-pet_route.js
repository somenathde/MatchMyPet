const express= require('express');
const {handleAdoptPetRegister,handleGetAllAdoptablePet } = require('../controllers/adopt-pet_Controller');
const router = express.Router({ mergeParams: true })
const {authenticateShelterAdmin} =require("../middlewares/authenticateUser_middleware")

router.post("/register",authenticateShelterAdmin,handleAdoptPetRegister);
router.get("/",handleGetAllAdoptablePet);



module.exports=router;