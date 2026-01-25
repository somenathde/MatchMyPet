const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  authenticateAdmin,
} = require("../middlewares/authenticateUser_middleware");
const {authorizeGroomingProviderAdmin}=require("../middlewares/authorisedUser_middleware")
const {authenticateUser}=require("../middlewares/authenticateUser_middleware")
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

router.post("/provider",authenticateUser, handleAddGroomingServiceProvider);
router.put("/provider/:id",authenticateUser, authorizeGroomingProviderAdmin, handleModifyGroomingServiceProvider);
router.get("/provider/:id",authenticateUser,handleGetOneGroomingServiceProvider);
router.get("/provider",authenticateUser, handleGetAllGroomingServicesProvider);
router.patch("/provider/:id/add-admin",authenticateUser, authorizeGroomingProviderAdmin, handleAddAdminGroomingServicesProvider);
router.patch("/provider/:id/remove-admin",authenticateUser,authorizeGroomingProviderAdmin, handleRemoveAdminGroomingServicesProvider);
router.delete("/provider/:id",authenticateUser, authenticateAdmin, handleDeleteOneGroomingServiceProvider);


router.post("/service/:id",authenticateUser, authorizeGroomingProviderAdmin, handleAddGroomingService);
router.put("/service/:id/:serviceId",authenticateUser,authorizeGroomingProviderAdmin,handleModifyGroomingService);
router.get("/service/:id/:serviceId",authenticateUser, handleGetOneGroomingService);
router.get("/service", handleGetAllGroomingServices);
router.delete("/service/:id/:serviceId",authenticateUser, authorizeGroomingProviderAdmin, handleDeleteOneGroomingService);//owner
router.post("/service/:id/:serviceId/give-rating",authenticateUser, handleRateGroomingService);


module.exports = router;
