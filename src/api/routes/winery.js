const { getWineries, postWinery, deleteWinery, updateWinery } = require("../controllers/winery")

const wineryRoutes = require("express").Router()

wineryRoutes.get("/", getWineries)
wineryRoutes.post("/", postWinery)
wineryRoutes.delete("/:id", deleteWinery)
wineryRoutes.put("/:id", updateWinery)

module.exports = wineryRoutes