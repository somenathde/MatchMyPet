const socket = require("socket.io")
const crypto = require("crypto");
const Chat = require("../models/chat");
const cookie = require("cookie")
const jwt = require("jsonwebtoken")

const initializeSocket = (server) => {
    /*const encrytedRoomId = (userId, targetUserId) => {
        return crypto.createHash("sha256").update([userId, targetUserId].sort().join("_")).digest("hex");
    }*/
    const hashId = (id) => {
        return crypto.createHash("sha256").update(id + process.env.HASH_SALT).digest("hex")
    }

    const io = socket(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        }
    })

    io.use((socket, next) => {
        try {
            const cookieHeader = socket.handshake.headers.cookie;
            if (!cookieHeader) return next(new Error("No cookies"));

            const cookies = cookie.parse(cookieHeader);
            const token = cookies.token;

            if (!token) return next(new Error("No token"));

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded._id;

            next();
        } catch (error) {
            next(new Error("Socket authentication failed"));
        }
    });

    io.on("connection", (socket) => {

        /*  socket.on("joinChat", ({ userId, targetUserId }) => {
              const room = encrytedRoomId(userId, targetUserId);
              console.log(`User ${userId} joined room ${room}`);
              console.log(userId, targetUserId);
              socket.join(room);
          })*/
        const userId = socket.userId;
        const encryptedUserId = hashId(userId);
        socket.join(encryptedUserId)


        socket.on("sendMessage", async ({ firstName, targetUserId, message }) => {
            if (!firstName || !targetUserId || !message) return;
            const encryptedTargetUserId = hashId(targetUserId);
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
                io.to(encryptedUserId).to(encryptedTargetUserId).emit("MessageReceived", {
                    senderId: userId,
                    message,
                    senderName: firstName,
                    createdAt: new Date()
                });
                io.to(encryptedTargetUserId).emit("NewMessageNotification",{
                    senderId: userId,
                    message,
                    senderName: firstName,
                    createdAt: new Date()
                })
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