const express = require("express")
const router = express.Router({ mergeParams: true })
const {authenticateUser}=require("../middlewares/authenticateUser_middleware")

const authRoute=require("./auth_route")
const userRoute=require("./user_route")
const shelterRoute=require("./shelter_route")
const adoptpetRoute=require("./adopt-pet_route")
const lostAndFoundRoute=require("./lostAndFound_route")
const groomingRoute=require("./grooming_route")
const storesRoute=require("./stores_route")
const ordersRoute=require("./orders_route")
const adminRoute=require("./admin_route")

router.use("/auth",authRoute)
router.use("/user",authenticateUser,userRoute)
router.use("/shelter",authenticateUser,shelterRoute)
router.use("/adopt-pet",authenticateUser,adoptpetRoute)
router.use("/lost-and-found",authenticateUser,lostAndFoundRoute)
router.use("/grooming",authenticateUser,groomingRoute)
router.use("/stores",authenticateUser,storesRoute)
router.use("/orders",authenticateUser,ordersRoute)
router.use("/admin",authenticateUser,adminRoute)



module.exports=router;