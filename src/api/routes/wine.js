const { isAdmin, isAuth } = require("../../middlewares/auth.middleware")
const { getWines, postWine, deleteWine, updateWine } = require("../controllers/wine")


const wineRoutes = require("express").Router()


wineRoutes.get("/", getWines)
wineRoutes.post("/", [isAuth], postWine)
wineRoutes.delete("/:id", [isAdmin], deleteWine)
wineRoutes.put("/:id", [isAdmin], updateWine)


module.exports = wineRoutes