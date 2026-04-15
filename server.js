require("dotenv").config()
const app = require("./src/app");

const connectToDB = require("./src/config/db.js")

connectToDB();

app.listen(8000, ()=>{
    console.log("server is running on port 8000");
})