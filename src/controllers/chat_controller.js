const Chat = require("../models/chat");
const throwError = require("../utils/throwError")
const validator = require("validator")


const handleChat = async (req, res) => {
    try {
        const { targetUserId } = req.params;
        const userId = req.userId;
        //console.log(userId,targetUserId)
        if (!targetUserId) { throwError("Missing required fields", 400) }
        if (targetUserId.toString() === userId.toString()) { throwError("Cannot chat with yourself", 400) }
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
const handleChatList = async (req, res) => {
    try {
        const userId = req.userId;
        let chats = await Chat.find({ participants: { $in: [userId] } }).populate("participants", "firstName").sort({ updatedAt: -1 });
        const chatList = chats.map((chat) => {
            const otherUser = chat.participants.find((p) => p._id.toString() !== userId)
            const letestMessage = chat.messages[chat.messages.length - 1]
            return {
                chatId: chat._id,
                userId: otherUser._id,
                name: otherUser.firstName,
                letestMessage: letestMessage?.text || "",
                letestMessageTime: letestMessage?.createdAt || chat.updatedAt,
            }
        })
        res.status(200).json({ success: true, message: "ChatList retrieved successfully", data: chatList });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
    }


}
module.exports = { handleChat, handleChatList }
