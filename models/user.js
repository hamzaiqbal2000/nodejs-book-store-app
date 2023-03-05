const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    return getDb()
      .collection("users")
      .insertOne(this)
      .then((res) => console.log("user saved " + res))
      .catch((err) => console.log(err));
  }

  static findByPk(userId) {
    return getDb()
      .collection("users")
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
