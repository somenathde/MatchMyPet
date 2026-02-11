const express = require("express");
const app = express();
const router = require("./routes/index")
const cookieParser = require("cookie-parser")
const cors = require("cors")
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser())

app.use("/", router);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: statusCode >= 500 ? "Internal server error" : error.message });
})



module.exports = app;
