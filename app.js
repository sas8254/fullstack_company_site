const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const productRoutes = require("./routes/productRoutes");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/product-portfolio")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads/images")));
app.use(express.static(path.join(__dirname, "uploads/pdfs")));
app.use(methodOverride("_method"));

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/product", (req, res) => {
  res.render("products");
});


const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
