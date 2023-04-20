require("dotenv").config();

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./server/util/database");

const userRoutes = require("./server/routes/user");
const chatRoutes = require("./server/routes/chat");

const Message = require("./server/models/message");
const User = require("./server/models/user");
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

User.hasMany(Message);
Message.belongsTo(User);

sequelize
  // .sync({force: true})
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
