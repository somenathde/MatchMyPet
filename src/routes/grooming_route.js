const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  authenticateAdmin,
} = require("../middlewares/authenticateUser_middleware");
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
router.put("/provider:id", handleModifyGroomingServiceProvider);
router.get("/provider:id",handleGetOneGroomingServiceProvider);
router.get("/provider/all", authenticateAdmin, handleGetAllGroomingServicesProvider);
router.delete("/provider:id", authenticateAdmin, handleDeleteOneGroomingServiceProvider);


router.post("/", authenticateAdmin, handleAddGroomingService);
router.put("/", authenticateAdmin, handleModifyGroomingService);
router.get("/:id",  handleGetOneGroomingService);
router.get("/",  handleGetAllGroomingServices);
router.delete("/:id", authenticateAdmin, handleDeleteOneGroomingService);
router.post("/:id/give-rating", handleRateGroomingService);


module.exports = router;
