const express = require("express");

const groupController = require("../controllers/group");

const router = express.Router();

router.post("/create-group", groupController.createGroup);

router.get('/', groupController.getGroups)

module.exports = router;
