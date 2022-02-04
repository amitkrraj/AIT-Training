const Sequelize = require("sequelize");

const sequelize = new Sequelize("sampleapp2", "root", "113920", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;
