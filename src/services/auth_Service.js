const { createHash } = require("crypto");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const throwError = require("../utils/throwError")
async function createPassword(password) {
    try {
        return await bcrypt.hash(password, 10)
    } catch (error) {
        throwError("failed to generate password", 500)
    }

}
async function comparePassword(myPlaintextPassword, hash) {
    try {
        return await bcrypt.compare(myPlaintextPassword, hash)
    } catch (error) {
        throwError("failed to Load password", 500)
    }
}

async function generateToken(id) {
    try {
        return await jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    } catch (error) {
        throwError("Failed to create token", 500)
    }
}

async function verifyToken(token) {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        throwError("Not Authorised", 401)
    }
}


module.exports = { createPassword, comparePassword, generateToken, verifyToken }