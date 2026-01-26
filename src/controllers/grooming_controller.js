const { validationGroomingServiceProviderSignupData, validationGroomingServiceProviderUpdateData, validationGroomingServiceRegisterData, validationGroomingServiceUpdateData } = require("../utils/validation");
const GroomingProvider = require("../models/groomingProvider_model")
const GroomingService = require("../models/groomingServices_model")
const validator = require("validator")
const throwError = require("../utils/throwError")


const handleAddGroomingService = async (req, res) => {
  try {
    validationGroomingServiceRegisterData(req);
    const groomingService = new GroomingService({
      ...req.body,
      providerId: req.groomingProviderId,
    })
    await groomingService.save()
    res.status(200).json({ success: true, message: "Service Created Successfully", data: groomingService });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleModifyGroomingService = async (req, res) => {
  try {
    validationGroomingServiceUpdateData(req)
    const result = await GroomingService.findByIdAndUpdate(req.params.serviceId, req.body)//todo)
    if (!result) throwError("Service not found / Not updated", 400)
    res.status(200).json({ success: true, message: "Modified Successsfully", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleGetOneGroomingService = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.serviceId)) throw new Error("Not valid service id")
    const result = await GroomingService.findById(req.params.serviceId)
    res.status(200).json({ success: true, message: "Successfuly Fetched", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleRateGroomingService = async (req, res) => {
  try {//todo
    if (!validator.isMongoId(req.params.serviceId)) throw new Error("Not valid service id")
    const groomingService = await GroomingService.findById(req.params.serviceId)
    if (!groomingService) throwError("Service not found", 404);

    const { average, count } = groomingService.ratings;
    const { rating } = req.body;
    if (rating === undefined || typeof rating !== "number") throw new Error("Rating must be a number")
    if (rating < 1 || rating > 5) throwError("Rating should between 1 to 5", 400)
    const newAvg = (average * count + req.body.rating) / (count + 1);
    groomingService.ratings.average = Number(newAvg);
    groomingService.ratings.count = count + 1;
    await groomingService.save()
    res.status(200).json({ success: true, message: "Rating", data: groomingService.ratings });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleDeleteOneGroomingService = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.serviceId)) throwError("Not valid service id", 400)
    const result = await GroomingService.findByIdAndDelete(req.params.serviceId)
    if (!result) throwError("Not Deleted", 404)
    res.status(200).json({ success: true, message: "Deleted Successfully", data: result._id });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

const handleGetAllGroomingServices = async (req, res) => {
  try {
    const result = await GroomingService.find({})
    if (!result) throwError("Not Found", 404)
    res.status(200).json({ success: true, message: "All Services Fetched Successfully", data: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};





const handleDeleteOneGroomingServiceProvider = async (req, res) => {
  try {
    const result = await GroomingProvider.findByIdAndDelete(req.params.id)
    if (!result) throwError("Not deleted", 404)
    const deleteServices = await GroomingService.deleteMany({ providerId: result._id })
    res.status(200).json({ message: "Provider Deleted, Services Deleted Successfully", data: { ProviderDeleted: result, serviceDeleted: deleteServices.deletedCount } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};


const handleAddGroomingServiceProvider = async (req, res) => {
  try {
    validationGroomingServiceProviderSignupData(req);
    const groomingProvider = new GroomingProvider({
      ...req.body,
      ownerId: req.userId,
      admins: [req.userId,]

    })
    await groomingProvider.save()

    res.status(201).json({ success: true, message: "Groomming Service provider registered successfully", data: groomingProvider });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};




const handleGetOneGroomingServiceProvider = async (req, res) => {
  try {
    const groomingProvider = await GroomingProvider.findById(req.params.id)
    if (!groomingProvider) throwError("Not Found", 404)
    res.status(200).json({ success: true, message: "Provider Fetched Successfully", data: groomingProvider });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleGetAllGroomingServicesProvider = async (req, res) => {
  try {
    const groomingProviders = await GroomingProvider.find({})
    if (!groomingProviders) throwError("Not Found", 404)
    res.status(200).json({ success: true, message: "All Provider Fetched Successfully", data: groomingProviders });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleModifyGroomingServiceProvider = async (req, res) => {
  try {
    validationGroomingServiceProviderUpdateData(req);
    const groomingStore = await GroomingProvider.findById(req.params.id)
    Object.keys(req.body).forEach(key => {
      groomingStore[key] = req.body[key]
    });
    if (req.body.providerType || req.body.businessName) groomingStore.isVerified = false;
    await groomingStore.save()
    res.status(200).json({ success: true, message: "Update Successful", data: groomingStore });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleAddAdminGroomingServicesProvider = async (req, res) => {
  try {

    const groomingProvider = await GroomingProvider.findByIdAndUpdate(req.params.id, { $addToSet: { admins: req.body.admin } }, { runValidator: true, returnDocument: "after" })
    if (!groomingProvider) throwError("update unsuccessful", 404)
    res.status(200).json({ success: true, message: "Update Successful", data: groomingProvider });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleRemoveAdminGroomingServicesProvider = async (req, res) => {
  try {

    const groomingProvider = await GroomingProvider.findByIdAndUpdate(req.params.id, { $pull: { admins: req.body.admin } }, { runValidator: true, returnDocument: "after" })
    if (!groomingProvider) throwError("update unsuccessful", 404)
    res.status(200).json({ success: true, message: "Update Successful", data: groomingProvider });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

module.exports = {
  handleAddGroomingService,
  handleModifyGroomingService,
  handleGetOneGroomingService,
  handleRateGroomingService,
  handleDeleteOneGroomingService,
  handleGetAllGroomingServices,
  handleDeleteOneGroomingServiceProvider,
  handleAddGroomingServiceProvider,
  handleGetOneGroomingServiceProvider,
  handleGetAllGroomingServicesProvider,
  handleModifyGroomingServiceProvider,
  handleAddAdminGroomingServicesProvider,
  handleRemoveAdminGroomingServicesProvider
};
