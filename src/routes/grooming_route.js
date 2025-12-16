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
  handleAddAdminGroomingServicesProvider,
  handleRemoveAdminGroomingServicesProvider
} = require("../controllers/grooming_controller");

router.post("/provider", handleAddGroomingServiceProvider);
router.put("/provider/:id", authorizeGroomingProviderAdmin, handleModifyGroomingServiceProvider);
router.get("/provider/:id",handleGetOneGroomingServiceProvider);
router.get("/provider", handleGetAllGroomingServicesProvider);
router.patch("/provider/:id/add-admin", authorizeGroomingProviderAdmin, handleAddAdminGroomingServicesProvider);
router.patch("/provider/:id/remove-admin",authorizeGroomingProviderAdmin, handleRemoveAdminGroomingServicesProvider);
router.delete("/provider/:id", authenticateAdmin, handleDeleteOneGroomingServiceProvider);


router.post("/service/:id", authorizeGroomingProviderAdmin, handleAddGroomingService);
router.put("/service/:id/:serviceId",authorizeGroomingProviderAdmin,handleModifyGroomingService);
router.get("/service/:id/:serviceId", handleGetOneGroomingService);
router.get("/service", handleGetAllGroomingServices);
router.delete("/service/:id/:serviceId", authorizeGroomingProviderAdmin, handleDeleteOneGroomingService);//owner
router.post("/service/:id/:serviceId/give-rating", handleRateGroomingService);


module.exports = router;
