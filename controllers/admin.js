const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  //   console.log(req.path);
  res.render("admin/edit-product", { path: "/admin/add-product" });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product();
  product.save(req.body);
  res.redirect("/");
};
exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  try {
    const prodId = req.params.productId;
    console.log(prodId);
    const product = await Product.findById(prodId);
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      path: req.path,
      editMode,
      product,
    });
  } catch (err) {
    console.log({ err: err.message });
  }
};
exports.postEditProduct = async (req, res, next) => {
  // console.log(req.params.id);
  const upDatedProduct = req.body;
  await Product.updateProduct(upDatedProduct.id, upDatedProduct);

  res.redirect("/admin/edit-product");
};
exports.deleteProduct = async (req, res, next) => {
  console.log(req.body.id);
  await Product.deleteProduct(req.body.id);
  res.redirect("/admin/products");
};
exports.getProducts = async (req, res, next) => {
  // console.log(products);
  const products = await Product.fetchAll();
  // console.log(products);
  res.render("admin/products", {
    products,
    path: "/admin/products",
  });
};
