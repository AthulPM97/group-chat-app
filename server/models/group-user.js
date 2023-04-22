const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const GroupUser = sequelize.define("groupUser", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = GroupUser;
