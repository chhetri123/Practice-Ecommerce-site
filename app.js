const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

//
const app = express();
app.set("view engine", "pug");
app.set("views", "views");

//
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorRoutes);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
