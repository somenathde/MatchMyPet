const express = require("express");
const app = express();
const router=require("./routes/index")
const cookieParser=require("cookie-parser")

app.use(express.json());
app.use(cookieParser())


app.use("/",router);




module.exports=app;
