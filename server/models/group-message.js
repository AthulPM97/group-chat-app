const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const GroupMessage = sequelize.define("group_message", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  content: Sequelize.STRING,
});

module.exports = GroupMessage;
