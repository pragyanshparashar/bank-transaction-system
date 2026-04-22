const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"],
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        select: false,

    }
},{
    timestamps:true
})

 userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return 
    }
  const hash = await bcrypt.hash(this.password , 10)
  this.password = hash
  return ;
 })

 userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
 }


 const userModel = mongoose.model("User" , userSchema);

 module.exports = userModel;

