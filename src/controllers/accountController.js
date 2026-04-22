const accountModel = require("../models/accountModel")

async function createAccountController(req,res){
try{
    const user = req.user
    const account = await accountModel.create({user: user._id});
    return res.status(201).json({message: "Account created successfully", account})

}catch (error){
    return res.status(500).json({message: "Internal server error"})

} 
}

module.exports = {createAccountController}