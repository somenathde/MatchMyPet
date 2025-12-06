const { createHash } = require("crypto");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
async function createPassword(password) {
    try {
         return await bcrypt.hash(password,10)
    } catch (error) {
        throw new Error("failed to generate password")
    }
    
}
async function comparePassword(myPlaintextPassword,hash) {
    try {
      return  await bcrypt.compare(myPlaintextPassword, hash)
    } catch (error) {
        throw new Error("failed to Load password")
    }
}

async function generateToken(id) {
    try {
        return await jwt.sign({_id:id},process.env.JWT_SECRET,{expiresIn:"1d"});
       
    } catch (error) {
        throw new Error ("Failed to create token")
    }
}

async function verifyToken(token) {
    try {
        return await jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        throw new Error ("Not Authorised")
    }
}


module.exports={createPassword, comparePassword, generateToken, verifyToken}