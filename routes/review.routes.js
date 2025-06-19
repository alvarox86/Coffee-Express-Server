const express = require("express")
const router = express.Router()

const Review = require("../models/Review.model")
const {verifyAdmin, verifyToken} = require("../middlewares/auth.middlewares")

router.post("/",verifyToken, async(req,res,next) =>{
    try {
        const response = await Review.create({
            username:req.payload._id,
            product:req.body.product,
            comment:req.body.comment,
            rating:req.body.rating
        })
        res.status(201).json(response)
    } catch (error) {
         next(error)
    }
})

router.get("/", async(req,res,next)=>{
    try {
        const response = await Review.find({})
        .populate("username")
        .populate("product")
        res.status(201).json(response)
    } catch (error) {
         next(error)
    }
})

router.get("/product/:productId", async(req,res,next)=>{
    try {
        const response = await Review.find({product:req.params.productId})
        .populate("product")
        .populate("username", "username")
        res.status(201).json(response)
    } catch (error) {
         next(error)
    }
})

router.delete("/:reviewId", async(req,res,next) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId)
        res.sendStatus(202)
    } catch (error) {
         next(error)
    }
})

module.exports = router