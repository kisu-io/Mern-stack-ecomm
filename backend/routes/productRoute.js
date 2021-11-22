const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.put("/review", isAuthenticatedUser, createReview);

router.get("/reviews", getProductReviews);

router.get("/", getAllProducts);

router.get("/reviews", getProductReviews);

router.delete("/reviews", isAuthenticatedUser, deleteReview);

router.post("/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.get("/:id", getProductDetails);

router.put("/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router.delete("/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
