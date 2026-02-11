const { validationGroomingServiceProviderSignupData, validationGroomingServiceProviderUpdateData, validationGroomingServiceRegisterData, validationGroomingServiceUpdateData } = require("../utils/validation");
const GroomingProvider = require("../models/groomingProvider_model")
const GroomingService = require("../models/groomingServices_model")
const validator = require("validator")
const throwError = require("../utils/throwError")


const handleAddGroomingService = async (req, res, next) => {
  try {
    validationGroomingServiceRegisterData(req);
    const groomingService = new GroomingService({
      ...req.body,
      providerId: req.groomingProviderId,
    })
    await groomingService.save()
    res.status(200).json({ success: true, message: "Service Created Successfully", data: groomingService });
  } catch (error) {
    next(error);
  }
};

const handleModifyGroomingService = async (req, res, next) => {
  try {
    validationGroomingServiceUpdateData(req)
    const result = await GroomingService.findByIdAndUpdate(req.params.serviceId, req.body, { new: true, runValidators: true })//todo)
    if (!result) throwError("Service not found / Not updated", 400)
    res.status(200).json({ success: true, message: "Modified Successsfully", data: result });
  } catch (error) {
    next(error);
  }
};

const handleGetOneGroomingService = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.serviceId)) throwError("Not valid service id", 400)
    const result = await GroomingService.findById(req.params.serviceId)
    res.status(200).json({ success: true, message: "Successfuly Fetched", data: result });
  } catch (error) {
    next(error);
  }
};

const handleRateGroomingService = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.serviceId)) throwError("Not valid service id", 400)

    const { rating } = req.body;
    if (rating === undefined || typeof rating !== "number") throwError("Rating must be a number", 400)
    if (rating < 1 || rating > 5) throwError("Rating should between 1 to 5", 400)

    const updatedRating = await GroomingService.findOneAndUpdate({ _id: req.params.serviceId, "ratings.users": { $ne: req.userId } }, [
      {
        $set: {
          "ratings.average": {
            $divide: [
              {
                $add: [{ $multiply: ["$ratings.average", "$ratings.count"] }, rating]

              }, { $add: ["$ratings.count", 1] }]
          },
          "ratings.count": { $add: ["$ratings.count", 1] },
          "ratings.users": {
            $concatArrays: ["$ratings.users", [req.userId]],
          }
        }
      }
    ],
      { new: true })


    if (!updatedRating) throwError("you already rated this service", 400)
    res.status(200).json({ success: true, message: "Rating", data: updatedRating.ratings });
  } catch (error) {
    next(error);
  }
};

const handleDeleteOneGroomingService = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.serviceId)) throwError("Not valid service id", 400)
    const result = await GroomingService.findByIdAndDelete(req.params.serviceId)
    if (!result) throwError("Not Deleted", 404)
    res.status(200).json({ success: true, message: "Deleted Successfully", data: result._id });
  } catch (error) {
    next(error);
  }
};

const handleGetAllGroomingServices = async (req, res, next) => {
  try {
    const result = await GroomingService.find({})
    res.status(200).json({ success: true, message: "All Services Fetched Successfully", data: result });
  } catch (error) {
    next(error);
  }
};





const handleDeleteOneGroomingServiceProvider = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const provider = await GroomingProvider.findById(req.params.id).session(session);
    if (!provider) throwError("Not deleted", 404);
    await GroomingProvider.deleteOne({ _id: provider._id }, { session })
    const deleteServices = await GroomingService.deleteMany({ providerId: provider._id }, { session })
    await session.commitTransaction()
    session.endSession();
    res.status(200).json({ message: "Provider Deleted, Services Deleted Successfully", data: { ProviderDeleted: provider, serviceDeleted: deleteServices.deletedCount } });
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    next(error);
  }
};


const handleAddGroomingServiceProvider = async (req, res, next) => {
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
    next(error);
  }
};




const handleGetOneGroomingServiceProvider = async (req, res, next) => {
  try {
    const groomingProvider = await GroomingProvider.findById(req.params.id)
    if (!groomingProvider) throwError("Not Found", 404)
    res.status(200).json({ success: true, message: "Provider Fetched Successfully", data: groomingProvider });
  } catch (error) {
    next(error);
  }
};
const handleGetAllGroomingServicesProvider = async (req, res, next) => {
  try {
    const groomingProviders = await GroomingProvider.find({})
    res.status(200).json({ success: true, message: "All Provider Fetched Successfully", data: groomingProviders });
  } catch (error) {
    next(error);
  }
};
const handleModifyGroomingServiceProvider = async (req, res, next) => {
  try {
    validationGroomingServiceProviderUpdateData(req);
    const groomingStore = await GroomingProvider.findById(req.params.id)
    if (!groomingStore) throwError("Not Found", 400)
    Object.keys(req.body).forEach(key => {
      groomingStore[key] = req.body[key]
    });
    if (req.body.providerType || req.body.businessName) groomingStore.isVerified = false;
    await groomingStore.save()
    res.status(200).json({ success: true, message: "Update Successful", data: groomingStore });
  } catch (error) {
    next(error);
  }
};
const handleAddAdminGroomingServicesProvider = async (req, res, next) => {
  try {

    const groomingProvider = await GroomingProvider.findByIdAndUpdate(req.params.id, { $addToSet: { admins: req.body.admin } }, { runValidator: true, returnDocument: "after" })
    if (!groomingProvider) throwError("update unsuccessful", 404)
    res.status(200).json({ success: true, message: "Update Successful", data: groomingProvider });
  } catch (error) {
    next(error);
  }
};
const handleRemoveAdminGroomingServicesProvider = async (req, res, next) => {
  try {

    const groomingProvider = await GroomingProvider.findByIdAndUpdate(req.params.id, { $pull: { admins: req.body.admin } }, { runValidator: true, returnDocument: "after" })
    if (!groomingProvider) throwError("update unsuccessful", 404)
    res.status(200).json({ success: true, message: "Update Successful", data: groomingProvider });
  } catch (error) {
    next(error);
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
