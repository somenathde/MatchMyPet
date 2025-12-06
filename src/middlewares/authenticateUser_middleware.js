const { verifyToken } = require("../services/auth_Service");

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

module.exports={authenticateUser};