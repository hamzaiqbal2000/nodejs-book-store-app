const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOps;
    if (this._id) {
      dbOps = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOps = db.collection("products").insertOne(this);
    }
    return dbOps
      .then((product) => {
        console.log(product);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    return getDb()
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findByPk(prodId) {
    return getDb()
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(prodId) {
    return getDb()
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
