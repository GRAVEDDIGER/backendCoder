const store = require("./fsreboot");

store.addProduct("Adrian", "danoeñ", 32);
store.deleteById(2);
console.log(process.uptime());
