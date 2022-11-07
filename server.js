const express = require("express");
const colors = require("colors");
const app = express();
app.use(express.json());
app.use("/api", require("./routes/productroutes"));

app.listen(8080, () => console.log("Server Online".blue));
