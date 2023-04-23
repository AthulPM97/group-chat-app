const express = require("express");

const chatController = require("../controllers/chat");

const router = express.Router();

router.post("/", chatController.postChat);

router.get('/', chatController.getChat);

router.post('/upload', chatController.postUploadImage);

module.exports = router;
