const { isAdmin } = require("../../middlewares/auth.middleware")
const { getWineries, postWinery, deleteWinery, updateWinery } = require("../controllers/winery")

const wineryRoutes = require("express").Router()

wineryRoutes.get("/", getWineries)
wineryRoutes.post("/", [isAdmin], postWinery)
wineryRoutes.delete("/:id", [isAdmin], deleteWinery)
wineryRoutes.put("/:id", [isAdmin], updateWinery)

module.exports = wineryRoutes