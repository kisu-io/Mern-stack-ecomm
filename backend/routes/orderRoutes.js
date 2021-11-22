const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.post("/new", isAuthenticatedUser, newOrder);

router.get("/:id", isAuthenticatedUser, getSingleOrder);

router.get("/me", isAuthenticatedUser, myOrders);

router.get("/admin", isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrder
);
router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
);

module.exports = router;
