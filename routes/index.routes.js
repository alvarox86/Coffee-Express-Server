const router = require("express").Router();

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const productRouter = require("./product.routes")
router.use("/product", productRouter)

const userRouter = require("./user.routes")
router.use("/user", userRouter)

const orderRouter = require("./order.routes")
router.use("/order", orderRouter)

const reviewRouter = require("./review.routes")
router.use("/review", reviewRouter)

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

const paymentRoutes = require("./payment.routes")
router.use("/payment", paymentRoutes)

module.exports = router;
