require("dotenv").config();

const mongoose = require("mongoose");


function connectToDB(){

    mongoose.connect(process.env.MONGODB_URI)
   .then(()=>{
    console.log("server is connected to DB")
   })
   .catch(err =>{
    console.log("error connecting to DB ,DB error:",err.message)
    process.exit(1)
   })
}

module.exports = connectToDB;
