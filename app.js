require ('dotenv').config({ override: true });
const express = require("express");




const app= express();
app.use((req, res)=>{res.send("homepage")})





app.listen(process.env.PORT,()=>{console.log("Server Sttarted Successfully")})