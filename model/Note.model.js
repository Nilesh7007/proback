const mongoose = require("mongoose");


const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
     body:{type:String,required:true},
     autherID:{type:String,required:true},
    category:{type:String,required:true},
    auther:{type:String,required:true},
},{
    versionKey:false
})

const NoteModel = mongoose.model("note",noteSchema)

module.exports = {NoteModel}

// {
//     "title": "learning node",
//     "body": "I am larning jwt",
//     "age": "chatur",
//     "category":"backend"
// }