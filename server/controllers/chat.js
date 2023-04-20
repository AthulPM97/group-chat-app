const Message = require("../models/message");
const sequelize = require("../util/database");

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
    // console.log(message);
    await t.commit();
    res.status(200).json({ message: "added succssfully" });
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

exports.getChat = async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    if (messages.length === 0) {
      return res.status(404).json({ message: "No chats found!" });
    }
    return res.status(200).json({ messages: messages });
  } catch (err) {
    console.log(err);
  }
};
