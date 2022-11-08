const express = require("express");
const routes = express.Router();
const Storage = require("../storage");
const dbManager = new Storage("data.json");

routes.get("/productos", async (req, res) => {
  const data = await dbManager.getAll(this.version);
  console.log("A productos request has been recived :".cyan, data, "".grey);
  res.send(data);
});
routes.get("/productoRandom", async (req, res) => {
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

routes.get("/productos/:id", async (req, res) => {
  const data = await dbManager.getById(this.version, parseInt(req.params.id));
  console.log(data);
  res.send(data);
});

//////////////////////////////////////////////////////////
//                  POST ROUTES                         //
//////////////////////////////////////////////////////////

routes.post("/productos", async (req, res) => {
  const objeto = await dbManager.addProduct(
    req.body.title,
    req.body.url,
    parseInt(req.body.price),
    this.version
  );
  console.log(objeto);
  res.send(JSON.stringify(objeto));
});

////////////////////////////////////
//           PUT ROUTES           //
////////////////////////////////////

routes.put("/productos/:id", async (req, res) => {
  const resultado = await dbManager.modifyById(
    this.version,
    parseInt(req.params.id),
    req.body
  );
  res.send(resultado);
});

////////////////////////////////////
//           DELETE ROUTES        //
////////////////////////////////////

routes.delete("/productos/:id", async (req, res) => {
  const resultado = await dbManager.deleteById(
    this.version,
    parseInt(req.params.id)
  );
  res.send(resultado);
});
module.exports = routes;
