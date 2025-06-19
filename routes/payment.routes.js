const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

const Product = require("../models/Product.model.js")
const Payment = require("../models/Payment.model.js")

router.post("/create-payment-intent", async (req, res, next) => {

  const productId = req.body[0]._id;

  try {

    const product = await Product.findById(productId)
    const priceToPay = product.price * 100    

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceToPay, 
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    await Payment.create({
      price: priceToPay,
      product: productId,
      status: "incomplete",
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      // buyer: req.payload // example to add who bought the product (not done in this example)
    })

    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
    });
    
  } catch (error) {
    next(error)
  }
});

router.patch("/update-payment-intent", async (req, res, next) => {
  console.log(req.body)
  const { clientSecret, paymentIntentId } = req.body;

  try {

    await Payment.findOneAndUpdate({
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    },{ 
      status: "succeeded" 
    });

    res.status(200).json();

  } catch (error) {
    next(error);
  }
});


module.exports = router