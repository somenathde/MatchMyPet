const express=require("express")
const router=express.Router({mergeParams:true})
const{authenticateAdmin,authenticateStoreAdmin}=require("../middlewares/authenticateUser_middleware")
const{handleAddNewProduct,handleDeleteOneproduct,handleGetAllReceivedOrders,handleGetListOfProducts,handleGetOneproduct,handleModifyOderStatusAndTracking,handleModifyOneProduct,handleModifyQuantityofOrderedProduct,handleRateOneProduct,handleResisterNewStore}=require("../controllers/stores_controller")


router.post("/:sid/products",authenticateStoreAdmin,handleAddNewProduct)
router.post("/:sid/products/:id/give-rating",handleRateOneProduct)
router.put("/:sid/products/:id",authenticateStoreAdmin,handleModifyOneProduct)
router.get("/:sid/products/:id",authenticateStoreAdmin,handleGetOneproduct)
router.get("/:sid/products",authenticateStoreAdmin,handleGetListOfProducts)
router.delete("/:sid/products:id",authenticateStoreAdmin,handleDeleteOneproduct)

router.get("/:sid/orders",authenticateStoreAdmin,handleGetAllReceivedOrders)
router.put("/:sid/orders/:id",authenticateStoreAdmin,handleModifyQuantityofOrderedProduct)
router.patch("/:sid/orders/:id",authenticateStoreAdmin,handleModifyOderStatusAndTracking)

router.post("/",authenticateAdmin,handleResisterNewStore) // Only Company store as of now
module.exports=router;