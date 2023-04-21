const Group = require("../models/group");
const GroupMessage = require("../models/group-message");
const GroupUser = require("../models/group-user");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.createGroup = async (req, res, next) => {
  const { groupName } = req.body;
  const user = req.user;
  const t = await sequelize.transaction();

  try {
    const group = await Group.create(
      {
        name: groupName,
        createdBy: user.dataValues.id,
      },
      {
        transaction: t,
      }
    );
    // console.log('created group', group, user)
    await t.commit();
    await group.addUser(user);
    // await group.setUsers([user]);
    return res.status(201).json({ message: "Group created!" });
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

exports.getGroups = async (req, res, next) => {
  const userId = req.user.dataValues.id;
  try {
    const groups = await Group.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: GroupUser,
          attributes: [],
          where: {
            userId: userId,
          },
          include: {
            model: User,
            attributes: [],
          },
        },
      ],
    });

    if (groups) {
      return res.status(200).json({ groups: groups });
    } else {
      return res.status(404).json({ message: "No groups found!" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addMember = async (req, res, next) => {
  const groupId = Number(req.params.groupId);
  const phone = Number(req.body.phone);
  try {
    const group = await Group.findByPk(groupId);
    const user = await User.findOne({ where: { phone: phone } });
    await group.addUser(user);
    return res.status(200).json({ message: "user added" });
  } catch (err) {
    console.log(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  const groupId = Number(req.body.groupId);
  const content = req.body.content;
  const userId = req.user.dataValues.id;
  try {
    await GroupMessage.create({
      content,
      userId,
      groupId,
    });
    return res.status(201).json({ message: "message saved" });
  } catch (err) {
    console.log(err);
  }
};

exports.getMessages = async (req, res, next) => {
  const groupId = Number(req.params.groupId);
  try {
    const messages = await GroupMessage.findAll({
      where: {
        groupId: groupId,
      },
    });
    if (messages) {
      return res.status(200).json({ messages: messages });
    }
    return res.status(404).json({ message: "No messages found" });
  } catch (err) {
    console.log(err);
  }
};
