const express = require("express");
const {RegisterController,loginController} = require("../controllers/authController")
const router = express.Router(); 



router.post("/register", RegisterController)
router.post("/login", loginController)

module.exports = router;