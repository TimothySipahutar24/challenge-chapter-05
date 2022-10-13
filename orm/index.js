const express = require("express");
const { Cars } = require("./models");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Create car
app.post("/cars", (req, res) => {
  const body = req.body;

  Cars.create(body)
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get all car
app.get("/cars", (req, res) => {
  Cars.findAll({
    order: [["id", "ASC"]],
  })
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get car data by id
app.get("/cars/:id", (req, res) => {
  const id = req.params.id;

  Cars.findByPk(id)
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Update car by id
app.put("/cars/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Cars.update(body, { where: { id: id } })
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Delete car by id
app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;

  Cars.destroy({ where: { id: id } })
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.listen(port, () => {
  console.log("running in port", port);
});
