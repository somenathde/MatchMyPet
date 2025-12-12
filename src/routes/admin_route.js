const express = require("express");
const router = express.Router({ mergeParams: true });
const{handleDashboard,handleAllusers,handleAllAdoptPet,handleLostAndFoundPets,handleDeleteLostAndFoundPets}=require("../controllers/admin_controller")
router.get("/dashboard", handleDashboard);
router.get("/users", handleAllusers);
router.get("/pets", handleAllAdoptPet);
router.get("/lost-and-found", handleLostAndFoundPets);
router.delete("/lost-and-found", handleDeleteLostAndFoundPets);

module.exports = router;
