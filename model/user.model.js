const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{type:String,require:true},
     email:{type:String,require:true},
    password:{type:String,require:true},
    age: {type:Number,require:true},
    
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}

// {
//     "name": "suraj",
//     "email": "suraj@gmail.com",
//     "password": "suraj",
//     "age":24
// }