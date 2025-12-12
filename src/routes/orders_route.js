const express=require("express")
const router=express.Router({mergeParams:true})
const{authenticateAdmin}=require("../middlewares/authenticateUser_middleware")
const{handlePlaceOrder,handleModifyOrder,handleGetOrderHistoryOfAUser,handleGetListOfOrders,handleCancelOrder,handleUpdateOrder}=require("../controllers/orders_controller")
router.post("/",handlePlaceOrder)
router.put("/",authenticateAdmin,handleModifyOrder)
router.get("/my",handleGetOrderHistoryOfAUser)
router.get("/",authenticateAdmin,handleGetListOfOrders)
router.patch("/:id/cancel",handleCancelOrder)
router.patch("/:id",authenticateAdmin,handleUpdateOrder)



module.exports=router;