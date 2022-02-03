const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const db = require("./config/db.json");
// const server = require("./constants/serverConstants.json");
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "113920",
    database: "sampleApp",
    multipleStatements: true
});

connection.connect(err => {
    if (err) throw err;
    console.log("Database connected");
});

app.listen(port, () => {
    console.log(`Sample App listening on port ${port}`);
});

// get all users
app.get("/users", (req, res) => {
    const sql = `SELECT * FROM users`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// get a user
app.get("/users/:userid", (req, res) => {
    const sql = `SELECT * FROM users WHERE UserID = ${req.params.userid}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// insert new user
app.post("/users/create", (req, res) => {
    const data = req.body;
    const sql = `INSERT INTO users (FirstName, LastName, Email, Phone) \
                VALUES ('${data.FirstName}', '${data.LastName}', '${data.Email}', ${data.Phone})`;
    connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send("User Created Successfully");
        }
    );
});

// update an existing user
app.put("/users/update/:userid", (req, res) => {
    const data = req.body;
    const sql = `UPDATE users SET \
                FirstName = '${data.FirstName}', LastName = '${data.LastName}', Email = '${data.Email}', \
                Phone = ${data.Phone} WHERE UserID = ${req.params.userid}`;
    connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send("User Data Updated");
        }
    );
});

//delete a user
app.delete("/users/delete/:userid", (req, res) => {
    let sql = `DELETE FROM transactions WHERE UserID = ${req.params.userid} ; \
             DELETE FROM users WHERE UserID = ${req.params.userid}`;
    connection.query(sql,(err, result) => {
        if (err) throw err;
        res.send("User successfully deleted");
    });
});