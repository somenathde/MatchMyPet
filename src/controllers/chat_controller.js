const Chat = require("../models/chat");
const throwError = require("../utils/throwError")
const validator = require("validator")


const handleChat = async (req, res) => {
    try {
        const { targetUserId } = req.params;
        const userId = req.userId;
        if (!targetUserId) { throwError("Missing required fields", 400) }
        if (targetUserId === userId) { throwError("Cannot chat with yourself", 400) }
        if (!validator.isMongoId(targetUserId)) throwError("Not valid user id", 400)
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] }
        }).populate({ path: "messages.senderId", select: "firstName" });
        if (!chat) {
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: []
            });
            await chat.save();
        }
        res.status(200).json({ success: true, message: "Chat retrieved successfully", data: chat });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
    }
}
const handleChatList=async (params) => {
    
}
module.exports = { handleChat,handleChatList}
