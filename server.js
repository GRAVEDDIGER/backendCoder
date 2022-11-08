const express = require("express");
const colors = require("colors");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/", require("./routes/productroutes"));
app.listen(8080, () => console.log("Server Online".blue));
