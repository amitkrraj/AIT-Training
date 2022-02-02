const express = require("express");
const app = express();
const connection = require("./database");
const port = 3000;

app.get("/", (req, res) => {
    let sql =
        `SELECT u.UserID, CONCAT(u.FirstName, " ", u.LastName) as 'Name', u.Email, Type, sum(Amount) as 'Total' FROM users u join transactions t on u.UserID = t.UserID WHERE u.UserID = 100 group by Type`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log(`Sample App listening on port ${port}`);
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    });
});
