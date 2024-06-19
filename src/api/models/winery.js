const mongoose = require("mongoose")

const winerySchema = new mongoose.Schema(
    {
        wineryName: { type: String, required: true },
        wines: [{ type: mongoose.Types.ObjectId, ref: "wines" }]
    },
    {
        timestamps: true,
        collection: "wineries"
    }
)

const Winery = mongoose.model("wineries", winerySchema, "wineries")
module.exports = Winery