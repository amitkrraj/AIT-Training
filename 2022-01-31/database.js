const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "113920",
    database: "sampleapp"
});

module.exports = connection;
