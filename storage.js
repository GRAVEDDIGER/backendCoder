const fs = require("fs").promises;
class Storage {
  constructor(file) {
    this.products = [];
    this.count = 0;
    this.file = file || "";
    this.version = 0;
    this.maxId = 0;
  }
  async versionUpdate() {
    const fecha = new Date().valueOf();
    this.version = fecha;
  }
  isVersionUpdated(version) {
    return this.version === version;
  }
  async maxIdItems() {
    let maxIdconstant = Math.max(...this.products.map((item) => item.id));
    if (maxIdconstant === -Infinity) maxIdconstant = 0;
    this.maxId = maxIdconstant;

    return maxIdconstant;
  }
  async loadFile(version) {
    if (!this.isVersionUpdated()) {
      const data = await fs.readFile(this.file, "utf-8");
      this.products = await JSON.parse(data);
      this.versionUpdate();
      this.maxIdItems();
      this.count = this.products.length;
      return true;
    }
    return false;
  }
  async addProduct(title, url, price, version) {
    await this.loadFile();
    let array = this.products;
    console.log(array);
    console.log(url);
    const maxIdConstant = (await this.maxIdItems()) + 1 || 0;
    const objeto = { title, url, price, id: maxIdConstant };
    array.push(objeto);
    this.products = array;
    console.log("nuevo", this.products);
    this.saveFile();
    this.maxId = this.maxId + 1;
    this.increaseCount(1);
    return objeto;
  }

  async saveFile() {
    if (this.products !== []) {
      const file = this.file;
      await fs.writeFile(file, JSON.stringify(this.products));
      this.versionUpdate();
    }
  }
  increaseCount(n) {
    this.count = this.count + n;
  }
  async getAll(version) {
    await this.loadFile(version);
    return this.products;
  }

  async getById(version, id) {
    await this.loadFile(version);
    const producto = this.products.filter((item) => item.id === id);

    return producto || { error: "Id no encontrado" };
  }
  async deleteById(version, id) {
    await this.loadFile(version);
    this.products = this.products.filter((item) => item.id !== id);
    this.saveFile();
    this.increaseCount(-1);
    this.versionUpdate();
    return "Objeto Eliminado";
  }
  deleteAll() {
    this.products = [];
    this.saveFile();
  }
  async modifyById(version, id, objeto) {
    await this.loadFile(version);
    const resultado = this.products.findIndex((item) => {
      return item.id === id;
    });
    if (resultado !== -1) {
      this.products[resultado] = {
        ...this.products[resultado],
        title: objeto.title,
        url: objeto.url,
        price: objeto.price,
      };
      this.saveFile();
      objeto = this.products[resultado];
    } else {
      objeto = { error: "No se encontro producto con ese id" };
    }
    console.log("Objeto Modificado".gray, objeto);
    return objeto;
  }
}

module.exports = Storage;
