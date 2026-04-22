const express = require("express");
const {authMiddleware} = require("../middleware/auth.middleware")
const {createAccountController} = require("../controllers/accountController")
const router = express.Router();


router.post("/create", authMiddleware, createAccountController)


module.exports = router;
