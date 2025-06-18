const express = require("express")
const router = express.Router()

const User = require("../models/User.model")
const {verifyToken} = require("../middlewares/auth.middlewares")

router.get("/",verifyToken, async(req,res,next) =>{//En esta llamada no se hace populate del carrito para simplicar la transferencia de datos. Para obtener los datos del carro ruta : /cart 
    try {
        const response = await User.findById(req.payload._id)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.patch("/",verifyToken, async(req,res,next) =>{
    try {
        const response = await User.findByIdAndUpdate(req.payload._id,{
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
//Solicitamos el id mediante el payload para que sea seguro. Si lo pasamos por 
// parametros dinamicos un usuario podria acceder a los datos de otro usuario y modificarlos
router.get("/cart",verifyToken, async(req,res,next) => {
    try {

        const response = await User.findById(req.payload._id)
        .select({cart:1})
        .populate("cart")
        console.log(response.cart)
        res.status(200).json(response.cart)

    } catch (error) {
        console.log(error)
    }
})

router.patch("/cart/:productId/add", verifyToken, async(req,res,next) => {
    try {
        const response = await User.findByIdAndUpdate(req.payload._id,
            {$push:{cart:req.params.productId}},
            {new:true}
        )
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.patch("/cart/:productId/remove", verifyToken, async(req,res,next) => {
    try {
        const response = await User.findById(req.payload._id)
        .select({cart:1})
        //1. Mostramos el carrito del usuario con los valores que tiene en el array
        console.log(response.cart)//Este es el carrito del user
        const index = response.cart.indexOf(req.params.productId)
        //2. Editamos el carrito para poder eliminar el producto que el usuario indica
        response.cart.splice(index, 1)
        console.log(response.cart)
        //3. Enviamos de nuevo a la base de datos el carrito(array) actualizado

        await User.findByIdAndUpdate(req.payload._id,{
            cart:response.cart
        })

        res.status(201).json(response.cart)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router