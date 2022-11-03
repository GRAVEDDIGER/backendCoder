const { Module } = require("module");

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
    if (this.version === 0) await this.loadFile();
    if (this.version !== version) await this.loadFile();
    let array = this.products;
    const maxIdConstant = (await this.maxIdItems()) + 1 || 0;
    array.push({ title, url, price, id: maxIdConstant });
    this.products = array;
    this.saveFile();
    this.maxId = this.maxId + 1;
    this.increaseCount(1);
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
    return producto;
  }
  async deleteById(version, id) {
    await this.loadFile(version);
    this.products = this.products.filter((item) => item.id !== id);
    this.saveFile();
    this.increaseCount(-1);
    this.versionUpdate();
  }
  deleteAll() {
    this.products = [];
    this.saveFile();
  }
}

module.exports = Storage;
