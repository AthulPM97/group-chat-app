const { Sequelize } = require("sequelize");
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
    await t.commit();
    await GroupUser.create({
      groupId: group.dataValues.id,
      userId: user.dataValues.id,
      isAdmin: true,
    });
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
    const groupUser = await GroupUser.findOne({
      where: {
        groupId: groupId,
        userId: req.user.dataValues.id,
      },
    });
    if (groupUser.dataValues.isAdmin) {
      const group = await Group.findByPk(groupId);
      const user = await User.findOne({ where: { phone: phone } });
      await group.addUser(user);
      return res.status(200).json({ message: "user added" });
    } else {
      return res.status(500).json({ message: "Only admin can add users!" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getMembers = async (req, res) => {
  const groupId = Number(req.params.groupId);
  try {
    const members = await GroupUser.findAll({
      attributes: [
        'id',
        [Sequelize.literal('`User`.`name`'), 'name'],
        [Sequelize.literal('`User`.`phone`'), 'phone'],
        'isAdmin'
      ],
      include: [
        {
          model: User,
          attributes: []
        }
      ],
      where: {
        groupId: groupId
      }
    });

    res.status(200).json(members);
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
  const userId = Number(req.user.dataValues.id);
  try {
    const messages = await GroupMessage.findAll({
      attributes: [
        'id',
        'content',
        [Sequelize.literal('`User`.`name`'), 'name']
      ],
      include: [
        {
          model: User,
          attributes: []
        }
      ],
      where: {
        groupId: groupId
      },
      raw: true
    });
    
    // console.log(messages);
    if (messages) {
      return res.status(200).json({ messages: messages });
    }
    return res.status(404).json({ message: "No messages found" });
  } catch (err) {
    console.log(err);
  }
};
