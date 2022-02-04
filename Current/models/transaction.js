const Sequelize = require("sequelize");
const db = require("../config/database");

const Transaction = db.define("transaction", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = Transaction;
