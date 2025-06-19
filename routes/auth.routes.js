const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")
const {verifyToken} = require("../middlewares/auth.middlewares")

router.post("/signup", async(req,res,next) => {

    console.log(req.body)

    const {email, password, username, phone, rol, adress, profilepicture} = req.body

    if (!username || !email || !password) {
        res.status(400).json({ errorMessage: "All fields are required" })
        return;
    }

    let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    if (regexPassword.test(password) === false) {
        res.status(400).json({ errorMessage: "The password is invalid. It must contain at least one letter, one number, one special character, and be between 8 and 16 characters long." })
    return;
    }

    try {
        const foundUser = await User.findOne({email:email})

        if (foundUser !== null) {
            res.status(400).json({ errorMessage: "There is already a user with that email address." })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 12)

        await User.create({
            email,
            password:hashPassword,
            username,
            phone,
            rol,
            adress,
            profilepicture
        })

        res.sendStatus(201)

    } catch (error) {
        next(error)
    }
})

router.post("/login", async(req,res,next) => {

    const {email, password} = req.body

    if (!email || !password) {
        res.status(400).json({ errorMessage: "All fields are required" })
        return;
    }

    try {
        const foundUser = await User.findOne({email:email})

        if (foundUser === null) {
            res.status(400).json({ errorMessage: "Unregistered user" })
            return;
        }

        const isPasswordCorrect = await bcrypt.compare( password, foundUser.password )
        if (isPasswordCorrect === false) {
            res.status(400).json({ errorMessage: "The password is not valid" })
            return;
        }

        const payload = {
            _id:foundUser._id,
            email:foundUser.email,
            rol:foundUser.rol
        }

        const authToken = jwt.sign(payload, process.env.SECRET_TOKEN,{
            algorithm:"HS256",
            expiresIn:"7d"
        })

        res.status(200).json( { authToken } )

    } catch (error) {
        next(error)
    }

})

router.get("/verify", verifyToken, (req,res,next) =>{
    res.json({
        payload:req.payload
    })
})


module.exports = router