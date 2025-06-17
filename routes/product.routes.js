const express = require("express")
const router = express.Router()

const Product = require("../models/Product.model")
const {verifyAdmin, verifyToken} = require("../middlewares/auth.middlewares")

//Ruta para crear un producto
router.post("/",verifyToken, verifyAdmin, async(req,res,next) =>{
    try {
        const response = await Product.create({
            name:req.body.name,
            description:req.body.description,
            imageUrl:req.body.imageUrl || "https://res.cloudinary.com/dotfm1go0/image/upload/v1749917582/default-image_600_u1nizl.webp",
            origin:req.body.origin,
            country:req.body.origin.country,
            region:req.body.origin.region,
            latitude:req.body.origin.latitude,
            longitude:req.body.origin.longitude,
            type:req.body.type,
            price:req.body.price,
            stock:req.body.stock,
            createdBy:req.payload._id
        })

        res.status(200).json(response)
        
    } catch (error) {
        console.log(error)
    }
})

//Ruta para ver todos los productos
router.get("/", async(req,res,next)=>{ //Relacion con populate???????
    try {
        const response = await Product.find({})
        .populate("createdBy")
        res.status(200).json(response)
    } catch (error) {
        next(error)        
    }
})

router.get("/:productId", async(req,res,next) =>{
    try {
        const response = await Product.findById(req.params.productId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.get("/:productId/modify", verifyToken, verifyAdmin, async(req,res,next) =>{
    try {
        const response = await Product.findById(req.params.productId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.put("/:productId", verifyToken, verifyAdmin, async(req,res,next) =>{
    try {
        const response = await Product.findByIdAndUpdate(req.params.productId,{
            name:req.body.name,
            description:req.body.description,
            imageUrl:req.body.imageUrl || "https://res.cloudinary.com/dotfm1go0/image/upload/v1749917582/default-image_600_u1nizl.webp",
            origin:req.body.origin,
            country:req.body.origin.country,
            region:req.body.origin.region,
            latitude:req.body.origin.latitude,
            longitude:req.body.origin.longitude,
            type:req.body.type,
            price:req.body.price,
            stock:req.body.stock
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:productId", verifyToken, verifyAdmin, async(req,res,next) =>{
    try {
        const response = await Product.findByIdAndDelete(req.params.productId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})





module.exports = router