const { verifyToken } = require("../utils/token")
const User = require("../api/models/users")


const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", '')
    if (!token) {
        return res.status(401).json("Unauthoraized")
    }
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (error) {
        return res.status(401).json("Unauthoraized")
    }
}

module.exports = { isAuth }