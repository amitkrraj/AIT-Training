const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./config/db.json");
const server = require("./constants/serverConstants.json");
const port = 3000;

app.use(bodyParser.json());

var connection = mysql.createConnection({
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

//insert new user
app.post("/users", (req, res) => {
    let user = req.body;
    var sql =
        "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL usersAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    connection.query(
        sql,
        [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
        (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if (element.constructor == Array)
                        res.send("Inserted users id : " + element[0].EmpID);
                });
            else console.log(err);
        }
    );
});



