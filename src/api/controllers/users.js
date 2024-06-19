const { generateToken } = require('../../utils/token')
const User = require('../models/users')
const bcrypt = require("bcrypt")


const getusers = async (req, res, next) => {
    try {
        const users = User.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json("No se han encontrado usuarios")
    }
}

const registerUser = async (req, res, next) => {
    try {
        const newUser = new User({
            userName: req.body.userName,
            password: req.body.password,
            rol: "user"
        })
        const userExist = await User.findOne({userName: req.body.userName})
        if(userExist){
            return res.status(400).json("error registrando al usuario")
        }
        const userSaved = await newUser.save()
        return res.status(201).json(userSaved)
    } catch (error) {
        return res.status(400).json("error resgistrando al usuario")
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })
        if (!user) {
            return res.status(400).json("Contraseña o usuario incorrectos")
        }
        if (bcrypt.compareSync(req.body.password, user.password)){
            const token = generateToken(user._id, user.userName)
            return res.status(200).json(token)
        }else {
            return res.status(400).json("Contraseña o usuario incorrectos")
        }
    } catch (error) {
        return res.status(400).json("Error en el login")
    }
}

module.exports = { getusers, registerUser, loginUser }