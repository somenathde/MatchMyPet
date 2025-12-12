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
} = require("../controllers/grooming_controller");
router.post("/", authenticateAdmin, handleAddGroomingService);
router.put("/", authenticateAdmin, handleModifyGroomingService);
router.get("/:id", authenticateAdmin, handleGetOneGroomingService);
router.get("/", authenticateAdmin, handleGetAllGroomingServices);
router.delete("/:id", authenticateAdmin, handleDeleteOneGroomingService);
router.post("/:id/give-rating", handleRateGroomingService);

module.exports = router;
