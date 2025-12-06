const express= require('express');
const { handleSignup , handleLogin} = require('../controllers/auth_controller');
const router = express.Router({ mergeParams: true })

router.post("/login",handleLogin);
router.post("/signup",handleSignup);



module.exports=router;