const express = require("express");
const {
  getProducts,
  getIndex,
  getCart,
  postCart,
  deleteCartItem,
  getCheckOut,
  getOrders,
  getProductsById,
} = require("../controllers/shop");
const router = express.Router();

// GET products
router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-delete-item", deleteCartItem);
router.get("/checkout", getCheckOut);
router.get("/orders", getOrders);
router.get("/products/:productID", getProductsById);

module.exports = router;
