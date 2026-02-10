const express = require("express");
const router = express.Router({ mergeParams: true });
const {handleChat, handleChatList}=require("../controllers/chat_controller")

router.get("/list",handleChatList)
router.get("/:targetUserId",handleChat)


module.exports = router;
