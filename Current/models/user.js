const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: Sequelize.BIGINT
    }
});

module.exports = User;
