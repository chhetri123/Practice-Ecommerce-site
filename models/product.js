const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "product.json"
);
class Product {
  constructor() {}
  save(data) {
    data.id = Math.random().toString();
    fs.readFile(p, (err, filecontent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(filecontent);
      }
      products.push(data);
      fs.writeFile(p, JSON.stringify(products, null, 2), (err) => {
        console.log(err);
      });
    });
  }
  static async updateProduct(id, data) {
    const products = await this.fetchAll();
    const updateProductIndex = products.findIndex((prod) => prod.id === id);
    const product = products.find((prod) => prod.id === id);
    products[updateProductIndex] = data;
    Cart.updateCart(id, product.price, data.price);
    await fs.promises.writeFile(p, JSON.stringify(products, null, 2));
  }
  static async fetchAll() {
    try {
      return JSON.parse(await fs.promises.readFile(p, { encoding: "utf8" }));
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteProduct(id) {
    const products = await this.fetchAll();
    const product = products.find((prod) => prod.id === id);
    const deleteProduct = products.filter((prodId) => prodId.id !== id);
    Cart.deleteCart(id, product.price);
    await fs.promises.writeFile(p, JSON.stringify(deleteProduct, null, 2));
  }
  static async findById(id) {
    const products = await this.fetchAll();
    const product = products.find((item) => item.id === id);
    return product;
  }
}

module.exports = Product;
