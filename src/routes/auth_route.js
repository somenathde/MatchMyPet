const express= require('express');
const { handleSignup , handleLogin,handleLogout} = require('../controllers/auth_controller');
const router = express.Router({ mergeParams: true })

router.post("/login",handleLogin);
router.post("/signup",handleSignup);
router.post("/logout",handleLogout);



module.exports=router;