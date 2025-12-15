const {validationGroomingServiceProviderSignupData,validationGroomingServiceProviderUpdateData,validationGroomingServiceRegisterData,validationGroomingServiceUpdateData}=require("../utils/validation");
const GroomingProvider=require("../models/groomingProvider_model")

const handleAddGroomingService = async (req, res) => {
  try {
    validationGroomingServiceRegisterData(req);

    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleModifyGroomingService = async (req, res) => {
  try {
    validationGroomingServiceUpdateData(req)
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleGetOneGroomingService = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleRateGroomingService = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleDeleteOneGroomingService = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleGetAllGroomingServices = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





const handleDeleteOneGroomingServiceProvider = async (req, res) => {
  try {
const result= await GroomingProvider.findByIdAndDelete(req.params.id)
//todo releted services delete
if(!result) throw new Error("Not deleted")
    res.status(200).json({ message: "done" });
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
