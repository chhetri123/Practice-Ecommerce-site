const express = require("express");
const router = express.Router();
const {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  getProducts,
  deleteProduct,
  postEditProduct,
} = require("../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", getAddProduct);
// /admin/add-product => POST
router.post("/add-product", postAddProduct);

//
router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);
router.post("/delete-product", deleteProduct);
router.get("/products", getProducts);

module.exports = router;
