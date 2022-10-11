const fs = require("fs").promises;
////////////
// CLASES //
////////////

class Product {
  constructor(id, title, url, price) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.price = price;
  }
}
//////////////////////////////////////
//STORAGE                           //
//CLASE CON FUNCIONES QUE DEVUELVEN //
//PROMISES                          //
//////////////////////////////////////
class Storage {
  constructor(products, file) {
    this.products = [products];
    this.count = 0;
    this.file = file;
  }
  //funcion que devuelve una promise con el contenido del archivo manipulado por el objeto esa promise contiene instancia del
  //objeto con los productos cargados en this.products
  async loadFile() {
    this.products = [];
    return new Promise((res, rej) => {
      res(
        fs.readFile(this.file, "utf-8").then((resolve) => {
          JSON.parse(resolve).forEach((producto) =>
            this.addNewProduct(producto.title, producto.url, producto.price)
          );
          return this;
        })
      );
      rej({ error: "Ha habido un error" });
    });
  }
  //contador que aumenta con cada nuevo item del array para generar ids unicos
  increaseCount() {
    this.count = this.count + 1;
  }

  //funcion que devuelve una promise y que agrega una instancia de producto al array de productos del store
  async addNewProduct(title, url, price) {
    this.products.push(new Product(this.count, title, url, price));
    this.increaseCount();
    return new Promise((resolve, reject) => {
      resolve(this);
      reject({ error: "Ha habido un error" });
    });
  }
  saveFile(datos) {
    fs.writeFile(this.file, JSON.stringify(datos));
  }
  getAll() {
    return new Promise((res, rej) => {
      res(this.products.map((product) => product.title));
      rej({ error: "Ha habido un error" });
    });
  }
  getById(id) {
    return new Promise((res, rej) => {
      res(
        this.products.filter((product) => {
          if (product.id === id) return product;
        })
      );
      rej({ error: "Ha habido un error" });
    });
  }
  deleteById(id) {
    return new Promise((res, rej) => {
      this.products = this.products.filter((product) => {
        if (product.id !== id) return product;
      });
      res(this);
      rej({ error: "Ha habido un error" });
    });
  }
  deleteAll() {
    this.products = [];
    return new Promise((res, rej) => {
      res(this);
      rej({ error: "Ha habido un error" });
    });
  }
}
function storageClosure(Store, file) {
  const store = new Store([], file);
  const addProduct = (title, url, price) => {
    store.loadFile().then((e) => {
      e.addNewProduct(title, url, price).then((res) =>
        res.saveFile(res.products)
      );
      console.log("LoadFile", e);
    });
  };
  const getAll = () => {
    store
      .loadFile()
      .then((res) => res.getAll().then((res) => console.log(res, "vertodo")))
      .catch((e) => console.log(e));
  };
  const getById = (id) => {
    store
      .loadFile()
      .then((res) => res.getById(id).then((response) => console.log(response)));
  };
  const deleteById = (id) => {
    store
      .loadFile()
      .then((res) =>
        res.deleteById(id).then((response) => res.saveFile(response.products))
      );
  };
  const deleteAll = () => {
    store.deleteAll().then((res) => res.saveFile(res.products));
  };

  return { addProduct, getAll, getById, deleteById, deleteAll };
}
const storeClosure = storageClosure(Storage, "productos.json");
module.exports = storeClosure;
