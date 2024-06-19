const { verifyToken } = require("../utils/token");
const User = require("../api/models/users");

const isAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const parsedToken = token.replace("Bearer ", "");
  
      const { id } = verifyToken(parsedToken);
      const user = await User.findById(id);
  
      user.password = null
      req.user = user
      next();
    
    } catch (error) {
      return res.status(401).json("Unauthoraized");
    }
  };

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");

    const { id } = verifyToken(parsedToken);
    const user = await User.findById(id);

    if (user.rol === "admin"){
        user.password = null
        req.user = user
        next();
    }else{
        return res.status(400).json("Acción reservada a administradores")
    }

  
  } catch (error) {
    return res.status(401).json("Unauthoraized");
  }
};

module.exports = { isAuth, isAdmin };
