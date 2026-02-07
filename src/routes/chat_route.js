const express = require("express");
const router = express.Router({ mergeParams: true });
const {handleChat}=require("../controllers/chat_controller")

router.get("/:targetUserId",handleChat)


module.exports = router;
