const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
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
app.use(express.static(path.join(__dirname, "files/productImages")));

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});