const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const { registerUser, loginUser } = require('../controllers/users')

UserRoutes.post('/register', isAuth, registerUser)
UserRoutes.post('/login', loginUser)

module.exports = UserRoutes