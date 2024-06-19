const { getWines, postWine, deleteWine, updateWine } = require("../controllers/wine")


const wineRoutes = require("express").Router()


wineRoutes.get("/", getWines)
wineRoutes.post("/", postWine)
wineRoutes.delete("/:id", deleteWine)
wineRoutes.put("/:id", updateWine)


module.exports = wineRoutes