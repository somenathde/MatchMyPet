const socket = require("socket.io")
const initializeSocket = (server) => {

    const io = socket(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        }
    })
    io.on("connection", (socket) => {

        socket.on("joinChat", ({userId, targetUserId}) => {
            const room = [userId, targetUserId].sort().join("_");
           
            console.log(` joined room ${room}`);
           // console.log(userId, targetUserId);
             socket.join(room);
        })
        socket.on("sendMessage", ({ userId, targetUserId, message }) => {
            if(!userId || !targetUserId || !message) return;
            const room = [userId, targetUserId].sort().join("_");
            //console.log(`Message from ${socket.id} to room ${roomId}: ${message}`);
             io.to(room).emit("MessageReceived", {from:userId, message});
        })
        socket.on("disconnect", () => {
            //console.log("Client disconnected: ", socket.id);
        })
    })
}
module.exports = initializeSocket;