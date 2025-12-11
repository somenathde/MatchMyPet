const express = require("express")
const router = express.Router({ mergeParams: true })
const {authenticateUser}=require("../middlewares/authenticateUser_middleware")

const authRoute=require("./auth_route")
const userRoute=require("./user_route")
const shelterRoute=require("./shelter_route")
const adoptpetRoute=require("./adopt-pet_route")
const lostAndFoundRoute=require("../routes/lostAndFound_route")

router.use("/auth",authRoute)
router.use("/user",authenticateUser,userRoute)
router.use("/shelter",authenticateUser,shelterRoute)
router.use("/adopt-pet",authenticateUser,adoptpetRoute)
router.use("/lost-and-found",authenticateUser,lostAndFoundRoute)



module.exports=router;