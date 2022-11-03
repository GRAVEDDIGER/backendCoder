const express = require("express");
const colors = require("colors");
const Storage = require("./storage");
const app = express();
const dbManager = new Storage("./data.json");
app.get("/productos", async (req, res) => {
  const data = await dbManager.getAll(this.version);
  console.log("A productos request has been recived :".cyan, data, "".grey);
  res.send(data);
});
app.get("/productoRandom", async (req, res) => {
  const productos = await dbManager.getAll(this.version);
  const randomIndex = Math.round(Math.random() * dbManager.count);
  const randomProduct = await dbManager.getById(this.version, randomIndex);
  console.log(
    "A Random Producto request has been recived :".cyan,
    randomProduct,
    "".grey
  );
  res.send(randomProduct);
});

app.listen(8080, () => console.log("Server Online".blue));
