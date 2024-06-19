const UserRoutes = require('express').Router()
const { isAdmin } = require('../../middlewares/auth.middleware')
const { registerUser, loginUser, getUsers } = require('../controllers/users')

UserRoutes.get("/", [isAdmin], getUsers)
UserRoutes.post('/register', registerUser)
UserRoutes.post('/login', loginUser)

module.exports = UserRoutes