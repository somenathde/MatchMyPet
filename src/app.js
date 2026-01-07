const express = require("express");
const app = express();
const router=require("./routes/index")
const cookieParser=require("cookie-parser")
const cors=require("cors")
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser())


app.use("/",router);




module.exports=app;
