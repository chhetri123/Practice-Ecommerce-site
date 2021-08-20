const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  // console.log(products);
  res.render("shop/product-list", {
    products,
    path: req.path,
  });
};

exports.getIndex = (req, res, next) => {
  // console.log(products);
  res.render("shop/index", {
    path: req.path,
  });
};

exports.getCart = async (req, res, next) => {
  const carts = await Cart.getCart();
  const products = await Product.fetchAll();
  const productsInCart = [];
  for (product of products) {
    const cart = carts.products.find((prod) => prod.id === product.id);
    if (cart) {
      productsInCart.push({ product, qty: cart.qty });
    }
  }
  // console.log(products);
  res.render("shop/cart", {
    path: req.path,
    products: productsInCart,
  });
};
exports.deleteCartItem = async (req, res, next) => {
  const prodId = req.body.id;
  const product = await Product.findById(prodId);
  Cart.deleteCart(prodId, product.price);
  res.redirect("/cart");
};

exports.getCheckOut = (req, res, next) => {
  res.render("shop/checkout", {
    path: req.path,
  });
};
exports.getOrders = (req, res, next) => {
  res.render("shop/order", {
    path: req.path,
  });
};
exports.getProductsById = async (req, res, next) => {
  const productId = req.params.productID;
  const product = await Product.findById(productId);
  res.render("shop/product-details", {
    product,
    path: "/products",
  });
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId);
    Cart.addProduct(prodId, product.price);
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};
