const express = require("express")

const dataRouter = express.Router();

const {DataModel} = require("../model/data.model")




dataRouter.get("/pro",async(req,res)=>{
    const query  = req.query
    try {
        const products= await DataModel.find({query})
    
        res.send(products)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})




dataRouter.post("/create", async (req,res)=>{
    try {
       await DataModel.insertMany(req.body)
        res.status(200).send({"msg":"New product has been added"})
    } catch (err) {
        res.status(400).send({"err":err.message})
    }

})



dataRouter.get("/",async(req,res)=>{
// const que = req.query
try {
    const products= await DataModel.find({autherID:req.body.autherID})

    res.send(products)
} catch (err) {
    res.status(400).send({"err":err.message})
}
})



dataRouter.patch("/update/:id", async(req,res)=>{
const {id} = req.params
const pro = await DataModel.findOne({_id:id})
try {
    if(req.body.autherID!==pro.autherID){
        res.status(200).send({"msg":`You are not authorised to do this action`})
    }
    else{
        await DataModel.findByIdAndUpdate({_id:id},req.body)

        res.status(200).send({"msg":`The product with id:${id} has been updated`})
    }

   } catch (err) {
    res.status(400).send({"err":err.message})
}
})



dataRouter.delete("/delete/:id", async(req,res)=>{
const {id} = req.params
const product = await DataModel.findOne({_id:id})
try {
    if(req.body.autherID!==product.autherID){
        res.status(200).send({"msg":`You are not authorised to do this action`})
    }
    else{
        await DataModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`the product with id:${id} has been deleted`})
    }
   } catch (err) {
    res.status(400).send({"err":err.message})
}
})



module.exports = {dataRouter}
