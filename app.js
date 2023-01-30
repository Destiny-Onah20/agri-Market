const express = require("express");
const userRoute = require("./routers/usersRoutes");
const cors = require("cors")

const app = express()

app.use(express.json());
app.use(cors())
app.use("/api", userRoute)

app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Welcome to agriMarket API"
    })
});

module.exports = app;