const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./config/db.json");
const server = require('./constants/serverConstants.json');

const connection = mysql.createConnection(db);

connection.connect(err => {
    if (err) throw err;
    console.log("Database connected");
});

module.exports = connection;

app.use(bodyParser.json());

app.listen(server.port, () => {
    console.log(`Sample App listening on port ${server.port}`);
});

// get all users
app.get("/users", (req, res) => {
    let sql = `SELECT * FROM users`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

// get a user
app.get("/users/:id", (req, res) => {
    let sql = `SELECT * FROM users WHERE UserID = ?`;
    connection.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

// delete a user
app.delete("/users/:id", (req, res) => {
    let sql = `DELETE u, t FROM users u LEFT JOIN transactions t ON t.UserID = u.UserID WHERE u.UserID = ?`;
    connection.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        res.send("User successfully deleted");
    });
});
