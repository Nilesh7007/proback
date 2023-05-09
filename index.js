const express = require ("express");


const {connection} = require("./db")
const app = express()
const jwt = require('jsonwebtoken')
const {UserRouter} = require("./User.routes/routes")


const {dataRouter} = require("./User.routes/data.route")
require('dotenv').config()
const cors = require("cors")
app.use(express.json())
app.use(cors())
app.use("/users",UserRouter)
app.get("/movie",(req,res)=>{
    res.status(200).json({"msg":"movie data"})
})
app.use("/data", dataRouter);
const {cartRouter} = require("./User.routes/cart.routes")

app.use("/cart", cartRouter);

const {auth} = require("./middelwear/auth.middlewear")
app.use(auth)



app.listen(process.env.port,async()=>{

    try {
        await connection
        console.log("connected to atlas data base!!!!!!!!")
    } catch (error) {
        console.log(error)
    }
console.log(`server runs on port ${process.env.port}`)
})















// const token = req.headers.authorization

// jwt.verify(token, 'masai', (err, decoded)=> {
   
//     if(decoded){
//         res.status(200).json({"msg":"movie data"})
//     }
//     else{
//         res.status(400).json({"msg":err.message})
//     }
// })