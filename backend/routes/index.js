const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoute");
router.use("/products", productRoutes);

const userRoutes = require("./userRoute");
router.use("/users", userRoutes);

const orderRoutes = require("./orderRoutes");
router.use("/order", orderRoutes);

module.exports = router;
