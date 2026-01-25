const express = require("express");
const router = express.Router({ mergeParams: true });
const{authorisedUserToEditLostFoundPetDetail}=require("..//middlewares/authorisedUser_middleware")
const{authenticateUser}=require("../middlewares/authenticateUser_middleware")
const {
  handleregisterLostOrFoundPet,
  handleModifyLostOrFoundPet,
  handlestatusforOneResolvePet,
  handlegetAllLostPet,
  handlegetAllFoundPet,
  handlegetOneLostOrFoundPet,
  handlegetAllLostAndFoundPet,
  handledeleteOneLostAndFoundPet,
} = require("../controllers/lostAndFound_controller");

router.post("/",authenticateUser, handleregisterLostOrFoundPet);
router.put("/:id",authenticateUser,authorisedUserToEditLostFoundPetDetail, handleModifyLostOrFoundPet);
router.patch("/:id/status",authenticateUser, handlestatusforOneResolvePet);
router.get("/lost", handlegetAllLostPet);
router.get("/found", handlegetAllFoundPet);
router.get("/:id",authenticateUser, handlegetOneLostOrFoundPet);
router.get("/", handlegetAllLostAndFoundPet);
router.delete("/:id",authenticateUser,authorisedUserToEditLostFoundPetDetail,handledeleteOneLostAndFoundPet);
module.exports = router;
