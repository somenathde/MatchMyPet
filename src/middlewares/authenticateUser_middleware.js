const { findById } = require("../models/user_model");
const { verifyToken } = require("../services/auth_Service");
const User = require("../models/user_model");
const Shelter = require("../models/shelter_model")
const throwError = require("../utils/throwError")

async function authenticateUser(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) throwError("Unauthorized", 401);
        const decoded = await verifyToken(token)
        req.userId = decoded._id;
        next()
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
    }
}

async function authenticateAdmin(req, res, next) {
    try {
        const user = await User.findById(req.userId)
        if (!user) throwError("user not found", 404);
        if (user.role !== "admin") throwError("Forbidden", 403);
        next()
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
    }

}

async function authenticateShelterAdmin(req, res, next) {
    try {
        const shelterId = req.body.shelterId || null;
        if (!shelterId) {
            req.shelterId = null;
            return next()
        }
        else {
            const shelter = await Shelter.findById(shelterId);
            if (!shelter) throwError("Not a valid shelter", 403)
            if (shelter.adminsUserId.includes(req.userId)) {
                req.shelterId = shelter._id;
            }
            else {
                throwError("you are not admin of mentioned shelter you can upload as individual user", 403);
            }
            next()
        }
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
    }
}




module.exports = { authenticateUser, authenticateAdmin, authenticateShelterAdmin };