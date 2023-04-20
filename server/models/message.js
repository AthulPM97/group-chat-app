const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: Sequelize.STRING,
  content: {
    type: Sequelize.STRING,
  },
});

module.exports = Message;
