 const accountModel = require("../models/accountModel");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function authMiddleware (req,res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({message: "Unauthorized access, token is missing"})
    }try{
        const decoded = jwt.verify(token, process.envJWT_SECRET)

        const user = await userModel.findById(decoded.id)
        req.user = user
       return next()
    }catch (error){
    return res.status(401).json({message: "Unauthorized , token is invalid"})
} 
}

module.exports = {authMiddleware}