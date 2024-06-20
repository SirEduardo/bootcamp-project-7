require("dotenv").config()
const cors = require("cors")
const UserRoutes = require("./src/api/routes/users");
const express = require("express");
const { connectDB } = require("./src/config/db");
const wineRoutes = require("./src/api/routes/wine");
const wineryRoutes = require("./src/api/routes/winery");

const app = express()
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/v1/user', UserRoutes)
app.use("/api/v1/winery", wineryRoutes)
app.use("/api/v1/wine", wineRoutes)


app.use("*", (req, res, next) => {
    const error = new Error("Route not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error")
})

app.listen(3000, () => {
    console.log("servidor levantado!");
})