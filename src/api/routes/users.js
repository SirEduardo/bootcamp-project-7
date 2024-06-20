const UserRoutes = require('express').Router()
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware')
const { registerUser, loginUser, getUsers, updateUser, deleteUser, deleteSelf } = require('../controllers/users')

UserRoutes.get("/", [isAdmin], getUsers)
UserRoutes.post('/register', registerUser)
UserRoutes.post('/login', loginUser)
UserRoutes.put("/:id", [isAdmin], updateUser)
UserRoutes.delete("/delete/:id", [isAdmin], deleteUser)
UserRoutes.delete("/delete-me/:id", [isAuth], deleteSelf)

module.exports = UserRoutes