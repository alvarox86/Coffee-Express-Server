const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

router.post("/create-payment-intent", async (req, res) => {

  const productId = req.body._id;

  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1400, 
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
    });
    
  } catch (error) {
    next(error)
  }
});

module.exports = router