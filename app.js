require("dotenv").config();

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./server/util/database");

const userRoutes = require("./server/routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);

sequelize
  //   .sync({force: true})
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
