const Message = require("../models/message");
const sequelize = require("../util/database");

// const io = require('socket.io')(3000);

exports.postChat = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { content } = req.body;

  try {
    const message = await Message.create(
      {
        content,
        userId: req.user.dataValues.id,
        userName: req.user.dataValues.name,
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    res.status(200).json({ message: message });
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

exports.getChat = async (req, res, next) => {
  
  try {
    const messages = await Message.findAll({
      attributes: ["id", "content", "userName", "userId"],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    const reversedMessages = messages.reverse();
    if (messages.length === 0) {
      return res.status(404).json({ message: "No chats found!" });
    }
    return res.status(200).json({ messages: reversedMessages });
  } catch (err) {
    console.log(err);
  }
};
