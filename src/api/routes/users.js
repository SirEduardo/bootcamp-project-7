const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const { registerUser, loginUser, getusers } = require('../controllers/users')

UserRoutes.get("/", getusers)
UserRoutes.post('/register', registerUser)
UserRoutes.post('/login', loginUser)

module.exports = UserRoutes