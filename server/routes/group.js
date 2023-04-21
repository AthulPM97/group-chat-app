const express = require("express");

const groupController = require("../controllers/group");

const router = express.Router();

router.post("/create-group", groupController.createGroup);

router.get("/", groupController.getGroups);

router.post("/send", groupController.sendMessage);

router.post("/:groupId", groupController.addMember);

router.get('/:groupId', groupController.getMessages);

module.exports = router;
