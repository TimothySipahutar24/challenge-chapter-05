const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;

const cloudinaryStorage = require("./cloudinary");
cloudinary.config({
  cloud_name: "dcod6a8ys",
  api_key: "621396721294993",
  api_secret: "Se9h9N2OloIn87A6gwO-1CEXKcE",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/add-car", (req, res) => {
  res.render("add-car", {});
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
