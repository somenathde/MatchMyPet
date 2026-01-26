
const handleDashboard = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Done", data: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleAllusers = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Done", data: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleAllAdoptPet = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Done", data: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleLostAndFoundPets = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Done", data: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};
const handleDeleteLostAndFoundPets = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Done", data: null });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
  }
};

module.exports = { handleDashboard, handleAllusers, handleAllAdoptPet, handleLostAndFoundPets, handleDeleteLostAndFoundPets }