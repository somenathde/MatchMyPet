const { findById } = require("../models/user_model");
const { verifyToken } = require("../services/auth_Service");
const User= require("../models/user_model");
const Shelter= require("../models/shelter_model")
const { error } = require("console");

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

async function authenticateShelterAdmin(req,res,next) {
    try {
        const shelterId=req.body.shelterId || null;
        if(!shelterId) next()
            else{
        const shelter=await Shelter.findById({_id:shelterId});
        if(!shelter) throw new Error("Not a valid shelter")
        if(shelter.adminsUserId.includes(req.userId)){
        req.shelterId=shelter._id;
         }
        else {
           throw new Error ("you are not admin of mentioned shelter you can upload as individual user");
        }
        next()}
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}


const authenticateStoreAdmin=async(req,res)=>{
    //todo
    next()
}

module.exports={authenticateUser, authenticateAdmin,authenticateShelterAdmin,authenticateStoreAdmin};