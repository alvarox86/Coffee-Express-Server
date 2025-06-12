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
        res.status(400).json({ errorMessage: "Todos los campos son obligatorios (name, email, password)" })
        return;
    }

    let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    if (regexPassword.test(password) === false) {
        res.status(400).json({ errorMessage: "La contraseña no es valida. Debe contener al menos una letra, un numero, un caracter especial y tener entre 8 y 16 caracteres." })
    return;
    }

    try {
        const foundUser = await User.findOne({email:email})

        if (foundUser !== null) {
            res.status(400).json({ errorMessage: "Ya existe un usuario con ese correo electronico" })
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
    console.log("Todo Ok")

    const {email, password} = req.body

    if (!email || !password) {
        res.status(400).json({ errorMessage: "Todos los campos son obligatorios (email, password)" })
        return;
    }

    try {
        const foundUser = await User.findOne({email:email})

        if (foundUser === null) {
            res.status(400).json({ errorMessage: "Usuario no registrado" })
            return;
        }

        const isPasswordCorrect = await bcrypt.compare( password, foundUser.password )
        if (isPasswordCorrect === false) {
            res.status(400).json({ errorMessage: "La contraseña no es válida" })
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