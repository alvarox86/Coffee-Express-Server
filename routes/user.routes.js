const express = require("express")
const router = express.Router()

const User = require("../models/User.model")

router.get("/:userId", async(req,res,next) =>{
    try {
        const response = await User.findById(req.params.userId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.patch("/:userId", async(req,res,next) =>{
    try {
        const response = await User.findByIdAndUpdate(req.params.userId,{
            username:req.body.username,
            phone:req.body.phone,
            adress:req.body.adress,
            profilepicture:req.body.profilepicture || "https://res.cloudinary.com/dotfm1go0/image/upload/v1749833868/1361728_qxjjh8.png"
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router