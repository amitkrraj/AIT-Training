const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database");
const router = require('./routes/index')
const app = express();

const port = process.env.port || 3000;

db.authenticate()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Error:" + err));

app.use(bodyParser.json());

app.use("/", router);

app.all("*", (req, res) => {
    res.status(404).send({ error: "not found" });
});

app.listen(port, console.log(`Server started on port ${port}`));
