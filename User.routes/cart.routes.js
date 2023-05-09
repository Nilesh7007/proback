const express = require("express")

const cartRouter = express.Router();

const {CartModel} = require("../model/cart.model")

// cartRouter.get("/wel",(req,res)=>{
//     res.send("welcome to cart router")
// })


// cartRouter.get("/pro",async(req,res)=>{
//     const query  = req.query
//     try {
//         const products= await CartModel.find(query)
    
//         res.send(products)
//     } catch (err) {
//         res.status(400).send({"err":err.message})
//     }
// })




cartRouter.post("/add", async (req,res)=>{
    try {
       const cart = new CartModel(req.body)

       await cart.save()
        res.status(200).send({"msg":"New product has been added"})
    } catch (err) {
        res.status(400).send({"err":err.message})
    }

})



cartRouter.get("/get",async(req,res)=>{
// const que = req.query
try {
    const products= await CartModel.find({autherID:req.body.autherID})

    res.send(products)
} catch (err) {
    res.status(400).send({"err":err.message})
}
})



cartRouter.patch("/up/:id", async(req,res)=>{
const {id} = req.params
const pro = await CartModel.findOne({_id:id})
try {
    if(req.body.autherID!==pro.autherID){
        res.status(200).send({"msg":`You are not authorised to do this action`})
    }
    else{
        await CartModel.findByIdAndUpdate({_id:id},req.body)

        res.status(200).send({"msg":`The product with id:${id} has been updated`})
    }

   } catch (err) {
    res.status(400).send({"err":err.message})
}
})



cartRouter.delete("/rem/:id", async(req,res)=>{
const {id} = req.params
const product = await CartModel.findOne({_id:id})
try {
    if(req.body.autherID!==product.autherID){
        res.status(200).send({"msg":`You are not authorised to do this action`})
    }
    else{
        await CartModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`the product with id:${id} has been deleted`})
    }
   } catch (err) {
    res.status(400).send({"err":err.message})
}
})



module.exports = {cartRouter}
