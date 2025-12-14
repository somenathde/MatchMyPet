const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  authenticateAdmin,
} = require("../middlewares/authenticateUser_middleware");
const {authorizeGroomingProviderAdmin}=require("../middlewares/authorisedUser_middleware")
const {
  handleDeleteOneGroomingService,
  handleAddGroomingService,
  handleGetOneGroomingService,
  handleRateGroomingService,
  handleGetAllGroomingServices,
  handleModifyGroomingService,
  handleDeleteOneGroomingServiceProvider,
  handleAddGroomingServiceProvider,
  handleGetOneGroomingServiceProvider,
  handleGetAllGroomingServicesProvider,
  handleModifyGroomingServiceProvider,
} = require("../controllers/grooming_controller");

router.post("/provider", handleAddGroomingServiceProvider);
router.put("/provider:id", authorizeGroomingProviderAdmin, handleModifyGroomingServiceProvider);
router.get("/provider:id",handleGetOneGroomingServiceProvider);
router.get("/provider/all", handleGetAllGroomingServicesProvider);
router.delete("/provider:id", authenticateAdmin, handleDeleteOneGroomingServiceProvider);


router.post("/", authorizeGroomingProviderAdmin, handleAddGroomingService);
router.put("/",authorizeGroomingProviderAdmin,handleModifyGroomingService);
router.get("/:id", handleGetOneGroomingService);
router.get("/", handleGetAllGroomingServices);
router.delete("/:id", authorizeGroomingProviderAdmin, handleDeleteOneGroomingService);//owner
router.post("/:id/give-rating", handleRateGroomingService);


module.exports = router;
