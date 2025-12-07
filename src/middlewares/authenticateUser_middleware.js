const { findById } = require("../models/user_model");
const { verifyToken } = require("../services/auth_Service");
const User= require("../models/user_model")

async function authenticateUser(req,res,next) {
    try {
        const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Unauthorized");
        const decoded=await verifyToken(token)
        req.userId=decoded._id;
        next()
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}

async function authenticateAdmin(req,res,next) {
    try {
       const user= await User.findById(req.userId)
     if (!user) throw new Error("user not found");
     if(user.role!=="admin") throw new Error("Unauthorised");
     next() 
    } catch (error) {
        res.status(401).json({error:error.message})
    }
    
}

module.exports={authenticateUser, authenticateAdmin};