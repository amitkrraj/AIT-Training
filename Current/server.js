const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/database");
const app = express();

const port = process.env.port || 3000;

db.authenticate()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Error:" + err));

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Index"));

app.use("/", require("./routes/user"));

app.listen(port, console.log(`Server started on port ${port}`));
