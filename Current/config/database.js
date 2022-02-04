const Sequelize = require("sequelize");

module.exports = new Sequelize("sampleapp2", "root", "113920", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0
    }
});