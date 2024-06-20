const Winery = require("../models/winery")

const getWineries = async (req, res, next) => {
    try {
        const wineries = await Winery.find()
        return res.status(200).json(wineries)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const postWinery = async (req, res, next) => {
    try {
        const newWinery = new Winery(req.body)

        const duplicatedWinery = await Winery.findOne({ wineryName: req.body.wineryName })

        if ( duplicatedWinery ){
            return res.status(400).json("Esta D.O ya existe")
        }
        const createdWinery = await newWinery.save()
        return res.status(201).json(createdWinery)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deleteWinery = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedWinery = await Winery.findByIdAndDelete(id)
        return res.status(200).json(`D.O ${deletedWinery} eliminado`)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateWinery = async (req, res, next) => {
    const { id } = req.params
    try {
        const oldWinery = await Winery.findById(id)

        if (!oldWinery){
            return res.status(404).json("D.O no encontrada")
        }
        const updatedWines = [...new Set([...oldWinery.wines, ...req.body.wines])]
        const updatedData = {
            ...req.body,
            wines: updatedWines,
        }
        const updatedWinery = await Winery.findByIdAndUpdate(id, updatedData, { new: true })

        return res.status(200).json(updatedWinery)
    } catch (error) {
        return res.status(400).json("Error al actualizar la D.O")
    }
}

module.exports = { getWineries, postWinery, deleteWinery, updateWinery }