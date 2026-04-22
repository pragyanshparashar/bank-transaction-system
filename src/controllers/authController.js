const userModel = require("../models/userModel")
const sendEmail = require("../utils/sendEmail");
const accountModel = require("../models/accountModel")
const jwt = require("jsonwebtoken")

const RegisterController = async (req, res) => {
  

  try {
  

    const { name, email, password } = req.body

    if (!name || !email || !password) {
    
      return res.status(400).json({ message: "All fields are required" })
    }
    

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
    
      return res.status(400).json({ message: "User already exists" })
    }
  

    const newUser = await userModel.create({ name, email, password })

   

 await sendEmail(
  newUser.email,
  "Welcome to Bank Transaction System",
  "Your account has been successfully created 🎉"
);
console.log("👉 About to send email to:", newUser.email);

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    )

    res.cookie("token", token, {
    
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000
    })
    
    

    return res.status(201).json({
   
      user: {
      
        id: newUser._id,
        email: newUser.email,
        name: newUser.name
      },
    
      message: "User registered successfully",
      token
    })
   

  } catch (error) {


    return res.status(500).json({ message: error.message })

  }


}



const loginController = async function(req,res){
const {email, password} = req.body;
const findUser = await userModel.findOne({email}).select("+password")
if(!findUser){
    return res.status(400).json({message: "invalid email or password"})
}

if(!(await findUser.comparePassword(password))){
    return res.status(400).json({message: "invalid email or password"})
}

const token = jwt.sign({ id: findUser._id}, process.env.JWT_SECRET, {expiresIn: "3d"})

res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3 * 24 * 60 * 60 * 1000})

    return res.status(200).json({
        user: {
            id: findUser._id,
            email: findUser.email
        },
        message: "User logged in successfully",
        token
    })

}
module.exports = { RegisterController, loginController }