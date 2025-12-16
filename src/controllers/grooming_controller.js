const {validationGroomingServiceProviderSignupData,validationGroomingServiceProviderUpdateData,validationGroomingServiceRegisterData,validationGroomingServiceUpdateData}=require("../utils/validation");
const GroomingProvider=require("../models/groomingProvider_model")
const GroomingService=require("../models/groomingServices_model")
const validator=require("validator")


const handleAddGroomingService = async (req, res) => {
  try {
    validationGroomingServiceRegisterData(req);
    const groomingService=new GroomingService({
      ...req.body,
      providerId:req.groomingProviderId,
    })
    await groomingService.save()
    res.status(200).json({ message: groomingService });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleModifyGroomingService = async (req, res) => {
  try {
    validationGroomingServiceUpdateData(req)
    const result=await GroomingService.findByIdAndUpdate(req.params.serviceId,req.body)//todo)
    if(!result) throw new Error("Service not found / Not updated")
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleGetOneGroomingService = async (req, res) => {
  try {
    if(!validator.isMongoId(req.params.serviceId)) throw new Error ("Not valid service id")
      const result= await GroomingService.findById(req.params.serviceId)
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleRateGroomingService = async (req, res) => {
  try {//todo
    if(!validator.isMongoId(req.params.serviceId)) throw new Error ("Not valid service id")
      const groomingService= await GroomingService.findById(req.params.serviceId)
    if(!groomingService) throw new Error ("Service not found");
    
    const{average,count}=groomingService.ratings;
    const{rating}=req.body;
    if(rating===undefined || typeof rating!=="number") throw new Error("Rating must be a number")
    if(rating<1 || rating>5) throw new Error("Rating should between 1 to 5")
    const newAvg=(average*count+req.body.rating)/(count+1);
    groomingService.ratings.average=Number(newAvg);
    groomingService.ratings.count=count+1;
  await groomingService.save()
    res.status(200).json({ message: `Rating ${groomingService.ratings}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleDeleteOneGroomingService = async (req, res) => {
  try {
    if(!validator.isMongoId(req.params.serviceId)) throw new Error ("Not valid service id")
      const result= await GroomingService.findByIdAndDelete(req.params.serviceId)
    res.status(200).json({ message: `"Deleted" ${result._id}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleGetAllGroomingServices = async (req, res) => {
  try {
      const result= await GroomingService.find({})
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





const handleDeleteOneGroomingServiceProvider = async (req, res) => {
  try {
const result= await GroomingProvider.findByIdAndDelete(req.params.id)
if(!result) throw new Error("Not deleted")
  const deleteServices=await GroomingService.deleteMany({providerId:result._id})
    res.status(200).json({ message:`deleted ${result}, service Deleted: ${deleteServices.deletedCount}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const handleAddGroomingServiceProvider = async (req, res) => {
  try {
  validationGroomingServiceProviderSignupData(req);
    const groomingProvider=new GroomingProvider({
      ...req.body,
      ownerId:req.userId,
      admins:[req.userId,]

    })
    await groomingProvider.save()

    res.status(200).json({ message: "Gromming Service provider registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const handleGetOneGroomingServiceProvider = async (req, res) => {
  try {
    const groomingProvider=await GroomingProvider.findById(req.params.id)
    if(!groomingProvider) throw new Error("Not Found")
    res.status(200).json({ message: groomingProvider});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetAllGroomingServicesProvider = async (req, res) => {
  try {
    const groomingProviders=await GroomingProvider.find({})
    if(!groomingProviders) throw new Error("Not Found")
    res.status(200).json({ message: groomingProviders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleModifyGroomingServiceProvider = async (req, res) => {
  try {
    validationGroomingServiceProviderUpdateData(req);
    const groomingStore= await GroomingProvider.findById(req.params.id)
      Object.keys(req.body).forEach(key => {
        groomingStore[key]=req.body[key]
      });
      if(req.body.providerType || req.body.businessName) groomingStore.isVerified=false;
    await groomingStore.save()
    res.status(200).json({ message: "Update Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleAddAdminGroomingServicesProvider = async (req, res) => {
  try {
    
    const groomingProvider= await GroomingProvider.findByIdAndUpdate(req.params.id,{$addToSet:{admins:req.body.admin}},{runValidator:true,returnDocument:"after"})
      if(!groomingProvider)throw new Error("update unsuccessful")
    res.status(200).json({ message: "Update Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleRemoveAdminGroomingServicesProvider = async (req, res) => {
  try {
    
    const groomingProvider= await GroomingProvider.findByIdAndUpdate(req.params.id,{$pull:{admins:req.body.admin}},{runValidator:true,returnDocument:"after"})
      if(!groomingProvider)throw new Error("update unsuccessful")
    res.status(200).json({ message: "Update Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
