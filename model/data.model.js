const mongoose = require("mongoose");


const dataSchema = mongoose.Schema({
  
img3:{type:String},
des:{type:String},
price:{type:String}


},{
    versionKey:false
})

const DataModel = mongoose.model("data",dataSchema)

module.exports = {DataModel}