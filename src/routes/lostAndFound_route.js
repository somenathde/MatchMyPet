const express = require("express");
const router = express.Router({ mergeParams: true });
const{authorisedUserToEditLostFoundPetDetail}=require("..//middlewares/authorisedUser_middleware")
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

router.post("/", handleregisterLostOrFoundPet);
router.put("/:id",authorisedUserToEditLostFoundPetDetail, handleModifyLostOrFoundPet);
router.patch("/:id/status", handlestatusforOneResolvePet);
router.get("/lost", handlegetAllLostPet);
router.get("/found", handlegetAllFoundPet);
router.get("/:id", handlegetOneLostOrFoundPet);
router.get("/", handlegetAllLostAndFoundPet);
router.delete("/:id",authorisedUserToEditLostFoundPetDetail, handledeleteOneLostAndFoundPet);
module.exports = router;
