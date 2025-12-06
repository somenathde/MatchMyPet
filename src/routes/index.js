const express = require("express")
const router = express.Router({ mergeParams: true })
const {authenticateUser}=require("../middlewares/authenticateUser_middleware")

const authRoute=require("./auth_route")
const userRoute=require("./user_route")



router.use("/auth",authRoute)
router.use("/user",authenticateUser,userRoute)



module.exports=router;