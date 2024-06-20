const { generateToken } = require('../../utils/token')
const User = require('../models/users')
const bcrypt = require("bcrypt")


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
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
            return res.status(400).json("Este usuario ya existe")
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
            const token = generateToken(user._id)
            return res.status(200).json({ user, token })
        }else {
            return res.status(400).json("Contraseña o usuario incorrectos")
        }
    } catch (error) {
        return res.status(400).json("Error en el login")
    }
}

const updateUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const newUser = new User(req.body)
        newUser._id = id
        const userUpdated = await User.findByIdAndUpdate(id, newUser, {new:true})
        return res.status(200).json(userUpdated)
    } catch (error) {
        return res.status(400).json("Error al actualizar el Usuario")
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        return res.status(200).json(`Se ha eliminado a ${deletedUser}`)
    } catch (error) {
        
    }
}


const deleteSelf = async (req, res, next) => {
    const { id } = req.params
    try {
        if(req.user.id === id){
            const deletedUser = await User.findByIdAndDelete(id)
            return res.status(200).json(deletedUser)
        }
        return res.status(400).json("Otro usuario no puede eliminarme")
    } catch (error) {
        return res.status(400).json("Error al eliminarme")   
    }
}


module.exports = { getUsers, registerUser, loginUser, updateUser, deleteUser, deleteSelf }