const socket = require("socket.io")
const crypto = require("crypto");
const Chat = require("../models/chat");

const initializeSocket = (server) => {
    const encrytedRoomId = (userId, targetUserId) => {
        return crypto.createHash("sha256").update([userId, targetUserId].sort().join("_")).digest("hex");
    }

    const io = socket(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        }
    })
    io.on("connection", (socket) => {

        socket.on("joinChat", ({ userId, targetUserId }) => {
            const room = encrytedRoomId(userId, targetUserId);

            console.log(`User ${userId} joined room ${room}`);
            // console.log(userId, targetUserId);
            socket.join(room);
        })
        socket.on("sendMessage", async ({ userId, targetUserId, message }) => {
            if (!userId || !targetUserId || !message) return;
            const room = encrytedRoomId(userId, targetUserId);
            try {
                const chat = await Chat.findOne({
                    participants: { $all: [userId, targetUserId] }
                });
                if (chat) {
                    chat.messages.push({
                        senderId: userId,
                        text: message,
                    });
                    await chat.save();
                } else {
                    const newChat = new Chat({
                        participants: [userId, targetUserId],
                        messages: [{
                            senderId: userId,
                            text: message,
                        }]
                    });
                    await newChat.save();

                }
                io.to(room).emit("MessageReceived", {
                    senderId: userId,
                    message,
                    senderName: "",
                    createdAt: new Date()
                });
            } catch (error) {
                console.error("Error saving message to database: ", error);
            }
        })
        socket.on("disconnect", () => {
            //console.log("Client disconnected: ", socket.id);
        })
    })
}
module.exports = initializeSocket;