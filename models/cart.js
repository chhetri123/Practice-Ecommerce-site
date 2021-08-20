const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
class Cart {
  //   constructor() {
  //     this.products = [];
  //     this.totalPrice = 0;
  //   }
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let data = { products: [], totalPrice: 0, totalQty: 0 };
      if (!err) {
        data = JSON.parse(fileContent);
      }

      const existingProductIndex = data.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = data.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        data.products = [...data.products];
        data.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        data.products = [...data.products, updatedProduct];
      }
      data.totalPrice = data.totalPrice + +productPrice;
      data.totalQty += 1;
      fs.writeFile(p, JSON.stringify(data, null, 2), (err) => {});
    });
  }
  static updateCart(id, oldPrice, newPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      fileContent = JSON.parse(fileContent);
      const upDateCartProduct = fileContent.products.find(
        (prod) => prod.id === id
      );
      console.log(upDateCartProduct);
      fileContent.totalPrice =
        fileContent.totalPrice -
        oldPrice * upDateCartProduct.qty +
        newPrice * upDateCartProduct.qty;
      fs.writeFile(p, JSON.stringify(fileContent, null, 2), (err) => {});
    });
  }
  static deleteCart(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      fileContent = JSON.parse(fileContent);

      const product = fileContent.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      fileContent.totalPrice -= productPrice * productQty;
      fileContent.totalQty -= productQty;

      fileContent.products = fileContent.products.filter(
        (prod) => prod.id !== id
      );
      fs.writeFile(p, JSON.stringify(fileContent, null, 2), (err) => {});
    });
  }

  static async getCart() {
    try {
      const cart = JSON.parse(await fs.promises.readFile(p));
      return cart;
    } catch (err) {
      return [];
    }
  }
}

module.exports = Cart;
