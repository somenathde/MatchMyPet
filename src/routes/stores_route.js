const express=require("express")
const router=express.Router({mergeParams:true})
const{authenticateAdmin}=require("../middlewares/authenticateUser_middleware")
const{authorisedStoreAdmin}=require("../middlewares/authorisedUser_middleware")
const{handleGetAllReceivedOrders,handleModifyOderStatusAndTracking,handleModifyQuantityofOrderedProduct,handleResisterNewStore,handleUpdateOneStore,handleAddAdmin,handleRemoveAdmin,handleGetOneStore,handleGetAllStore}=require("../controllers/stores_controller")
const{handleAddNewProduct,handleModifyOneProduct,handleDeleteOneproduct,handleGetListOfProducts,handleGetOneproduct,handleRateOneProduct,}=require("../controllers/product_controller")

router.post("/:sid/products",authorisedStoreAdmin,handleAddNewProduct)
router.post("/:sid/products/:id/give-rating",handleRateOneProduct)
router.put("/:sid/products/:id",authorisedStoreAdmin,handleModifyOneProduct)
router.get("/:sid/products/:id",authorisedStoreAdmin,handleGetOneproduct)
router.get("/:sid/products",authorisedStoreAdmin,handleGetListOfProducts)
router.delete("/:sid/products:id",authorisedStoreAdmin,handleDeleteOneproduct)

router.get("/:sid/orders",authorisedStoreAdmin,handleGetAllReceivedOrders)
router.put("/:sid/orders/:id",authorisedStoreAdmin,handleModifyQuantityofOrderedProduct)
router.patch("/:sid/orders/:id",authorisedStoreAdmin,handleModifyOderStatusAndTracking)



router.post("/",authenticateAdmin,handleResisterNewStore) // only company store as of now
router.put("/:sid",authorisedStoreAdmin,handleUpdateOneStore) 
router.patch("/:sid/add-admin",authorisedStoreAdmin,handleAddAdmin) 
router.patch("/:sid/remove-admin",authorisedStoreAdmin,handleRemoveAdmin)
router.get("/:sid",handleGetOneStore)
router.get("/",handleGetAllStore)




module.exports=router;