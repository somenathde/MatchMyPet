const express=require("express")
const router=express.Router({mergeParams:true})
const{authenticateAdmin}=require("../middlewares/authenticateUser_middleware")
const{handlePlaceOrder,handleGetOrderHistoryOfAUser,handleCancelOrder,handleUpdateOrderbyAdmin,handleGetAllReceivedOrders,handleModifyOderStatusAndTracking,handleModifyQuantityofOrderedProduct,handlegetSingleOrderdetail}=require("../controllers/orders_controller")
const { authorizeCancelOrder, authorizeStoreAdminOrPlatformAdminForOrders,authorizeStoreAdminForOrder,authorizeViewOrder,authorizeAdminOrderAction} = require("../middlewares/orderAuthorise_middleware")
router.post("/store/:sid",handlePlaceOrder)
router.get("/my",handleGetOrderHistoryOfAUser)
router.patch("/:oid/cancel",authorizeCancelOrder,handleCancelOrder)

router.get("/store",authorizeStoreAdminOrPlatformAdminForOrders,handleGetAllReceivedOrders)
router.put("/:oid/items",authorizeStoreAdminForOrder,handleModifyQuantityofOrderedProduct)//todo
router.patch("/:oid/status",authorizeStoreAdminForOrder,handleModifyOderStatusAndTracking)

router.patch("/:oid",authenticateAdmin,authorizeAdminOrderAction, handleUpdateOrderbyAdmin)//todo
router.get("/:oid",authorizeViewOrder,handlegetSingleOrderdetail)




module.exports=router;