const express=require("express")
const router=express.Router({mergeParams:true})
const{authenticateAdmin,authenticateUser}=require("../middlewares/authenticateUser_middleware")
const{authorisedStoreAdmin}=require("../middlewares/authorisedUser_middleware")
const{handleResisterNewStore,handleUpdateOneStore,handleAddAdmin,handleRemoveAdmin,handleGetOneStore,handleGetAllStore}=require("../controllers/stores_controller")
const{handleAddNewProduct,handleModifyOneProduct,handleDeleteOneproduct,handleGetListOfProducts,handleGetOneproduct,handleRateOneProduct,handleGetListOfProductsofStore}=require("../controllers/product_controller")


router.post("/:sid/products/:pid/give-rating",authenticateUser,handleRateOneProduct)
router.post("/:sid/products",authenticateUser,authorisedStoreAdmin,handleAddNewProduct)
router.put("/:sid/products/:pid",authenticateUser,authorisedStoreAdmin,handleModifyOneProduct)
router.get("/:sid/products/:pid",authenticateUser,authorisedStoreAdmin,handleGetOneproduct)
router.get("/:sid/products",authenticateUser,authorisedStoreAdmin,handleGetListOfProductsofStore)
router.delete("/:sid/products/:pid",authenticateUser,authorisedStoreAdmin,handleDeleteOneproduct)


router.post("/",authenticateUser,authenticateAdmin,handleResisterNewStore) // only company store as of now
router.put("/:sid",authenticateUser,authorisedStoreAdmin,handleUpdateOneStore) 
router.patch("/:sid/add-admin",authenticateUser,authorisedStoreAdmin,handleAddAdmin) 
router.patch("/:sid/remove-admin",authenticateUser,authorisedStoreAdmin,handleRemoveAdmin)
router.get("/:sid/store",authenticateUser,handleGetOneStore)
router.get("/products",handleGetListOfProducts)
router.get("/",handleGetAllStore)




module.exports=router;