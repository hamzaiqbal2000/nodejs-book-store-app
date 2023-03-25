const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("641f264d49d63bfe9f295f54")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

main()
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "max",
          email: "max@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(5000, () => {
      console.log(`listening on port 5000`);
    });
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://hello:hello@cluster0.0oyri.mongodb.net/shop?retryWrites=true&w=majority"
  );
}
