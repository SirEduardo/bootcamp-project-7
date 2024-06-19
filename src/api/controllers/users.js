const { generateToken } = require('../../utils/token')
const User = require('../models/users')
const bcrypt = require("bcrypt")

const registerUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        const userExist = await User.findOne({email: req.body.email})
        if(userExist){
            return res.status(400).json("error registrando al usuario")
        }
        const userSaved = await user.save()
        return res.status(201).json(userSaved)
    } catch (error) {
        return res.satus(400).json("error resgistrando al usuario")
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json("Contraseña o usuario incorrectos")
        }
        if (bcrypt.compareSync(req.body.password, user.password)){
            const token = generateToken(user._id, user.email)
            return res.status(200).json(token)
        }else {
            return res.status(400).json("Contraseña o usuario incorrectos")
        }
    } catch (error) {
        return res.status(400).json("Error en el login")
    }
}

module.exports = { registerUser, loginUser }