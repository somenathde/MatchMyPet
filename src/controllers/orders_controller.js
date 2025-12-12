const handlePlaceOrder = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleModifyOrder = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetOrderHistoryOfAUser = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleCancelOrder = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleUpdateOrder = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const handleGetListOfOrders = async (req, res) => {
  try {
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports={handlePlaceOrder,handleModifyOrder,handleGetOrderHistoryOfAUser,handleCancelOrder,handleUpdateOrder,handleGetListOfOrders}