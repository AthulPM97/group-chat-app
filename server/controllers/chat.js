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
