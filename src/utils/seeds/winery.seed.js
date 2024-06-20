const mongoose = require("mongoose")
const Winery = require("../../api/models/winery")
const wineries = require("../../data/winery")



const seed = async () => {
    try {
        await mongoose.connect("mongodb+srv://eduardosaanchezlopez:WAI7RJdWEs44kHK6@vinoteca.3pe4lag.mongodb.net/?retryWrites=true&w=majority&appName=vinoteca")
        await Winery.collection.drop()
        console.log("Dominaciones de Origen eliminadas");

        await Winery.insertMany(wineries)
        console.log("Dominaciones de Origen introducidas");

        await mongoose.disconnect()
    } catch (error) {
        console.log("error");
    }
}

seed()