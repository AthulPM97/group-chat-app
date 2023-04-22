require("dotenv").config();

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./server/util/database");

const userRoutes = require("./server/routes/user");
const chatRoutes = require("./server/routes/chat");
const groupRoutes = require("./server/routes/group");
const adminRoutes = require('./server/routes/admin');

const Message = require("./server/models/message");
const User = require("./server/models/user");
const Group = require("./server/models/group");
const GroupMessage = require("./server/models/group-message");
const GroupUser = require("./server/models/group-user");

const authenticateUser = require("./server/middlewares/authenticate");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"],
  })
);
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use("/chat", authenticateUser, chatRoutes);

app.use("/groups", authenticateUser, groupRoutes);

app.use('/admin', authenticateUser, adminRoutes);

User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(GroupMessage);
GroupMessage.belongsTo(User);

Group.hasMany(GroupMessage);
GroupMessage.belongsTo(Group);

User.belongsToMany(Group, {through: GroupUser});
Group.belongsToMany(User, {through: GroupUser});

User.hasMany(GroupUser);
GroupUser.belongsTo(User);

Group.hasMany(GroupUser);
GroupUser.belongsTo(Group);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
