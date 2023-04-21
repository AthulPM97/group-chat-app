const Group = require("../models/group");
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
      attributes: ['id', 'name'],
      include: [{
        model: GroupUser,
        attributes: [],
        where: {
          userId: userId
        },
        include: {
          model: User,
          attributes: [],
        }
      }]
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
