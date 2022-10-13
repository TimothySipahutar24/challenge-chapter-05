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

// Get all cars from API
app.get("/", async (req, res) => {
  try {
    const cars = await axios.get("http://localhost:5000/cars");
    res.render("index", cars.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// View only page add-car
app.get("/add-car", (req, res) => {
  res.render("add-car", {});
});

// Adding new car, send to API
app.post("/add-car", cloudinaryStorage.single("car-image"), (req, res) => {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(
    file,
    { folder: "challenge-chp-05" },
    async function (err, result) {
      if (!!err) {
        console.log(err);
        return res.status(400).json({
          message: "Gagal upload file!",
        });
      }

      const body = req.body;
      body.carImage = result.url;
      try {
        const cars = await axios.post("http://localhost:5000/cars", body);
        return res.redirect("/");
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  );
});

// View spesific cars by id
app.get("/edit-car/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const cars = await axios.get(`http://localhost:5000/cars/${id}`);
    res.render("edit-car", cars.data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update car data by id
app.post(
  "/update-car/:id",
  cloudinaryStorage.single("car-image"),
  (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(
      file,
      { folder: "challenge-chp-05" },
      async function (err, result) {
        if (!!err) {
          console.log(err);
          return res.status(400).json({
            message: "Gagal upload file!",
          });
        }

        const id = req.params.id;
        const body = req.body;
        body.carImage = result.url;
        try {
          const cars = await axios.put(
            `http://localhost:5000/cars/${id}`,
            body
          );
          return res.redirect("/");
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    );
  }
);

// Delete car by id
app.get("/delete-cars/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cars = await axios.delete(`http://localhost:5000/cars/${id}`);
    res.redirect("/");
  } catch (error) {
    return res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
