const express = require("express");
const app = express();
const connection = require("./database");
const port = 3000;

app.get("/users/:userid", (req, res) => {
    let sql =
        `SELECT u.UserID, CONCAT(u.FirstName, " ", u.LastName) as 'Name', u.Email, Type, sum(Amount) as 'Total' FROM users u join transactions t on u.UserID = t.UserID WHERE u.UserID = ? group by Type`;
    connection.query(sql, [req.params.userid], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Sample App listening on port ${port}`);
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    });
});