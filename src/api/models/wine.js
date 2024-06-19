
const mongoose = require("mongoose")


const wineSchema = new mongoose.Schema(
    {
        wineName: { type: String, required: true },
        year: { type: Number, required: true },
        wineries: [{ type: mongoose.Types.ObjectId, ref: "wineries" }]
    },
    {
        timestamps: true,
        collection: "wines"
    }
)

const Wine = mongoose.model("wines", wineSchema, "wines")
module.exports = Wine