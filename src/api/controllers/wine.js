const Wine = require("../models/wine");

const getWines = async (req, res, next) => {
  try {
    const wines = await Wine.find();
    return res.status(200).json(wines);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postWine = async (req, res, next) => {
  try {
    const newWine = new Wine(req.body);

    const wineDuplicated = await Wine.findOne({ wineName: req.body.wineName });

    if (wineDuplicated) {
      return res.status(400).json("Este vino ya existe");
    }
    const createdWine = await newWine.save();
    return res.status(201).json(createdWine);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteWine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedWine = await Wine.findByIdAndDelete(id);
    return res.status(200).json(`${deletedWine} eliminado`);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateWine = async (req, res, next) => {
  const { id } = req.params;
  try {
    const oldWine = await Wine.find(id);
    const updatedWinery = [
      ...new set([...oldWine.wineries, ...req.body.wineries]),
    ];
    const updatedData = {
      ...req.body,
      wineries: updatedWinery,
    };
    const wineUpdated = await Wine.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return res.status(200).json(wineUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getWines, postWine, deleteWine, updateWine };
