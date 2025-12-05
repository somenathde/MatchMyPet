const express = require("express")
const router = express.Router({ mergeParams: true })

const authRoute=require("./auth_route")
const userRoute=require("./user_route")



router.use("/user",userRoute)



module.exports=router;