const GroupUser = require("../models/group-user");
const User = require("../models/user");

exports.postMakeAdmin = async (req, res) => {
  const groupId = Number(req.body.groupId);
  const name = req.body.name;
  try {
    const user = await User.findOne({ where: { name: name } });
    const userId = Number(user.dataValues.id);
    const groupUser = await GroupUser.findOne({
      where: {
        userId: userId,
        groupId: groupId,
      },
    });
    groupUser.isAdmin = true;
    await groupUser.save();
    res.status(200).json({ message: "User is now admin!" });
  } catch (err) {
    console.log(err);
  }
};

exports.postDeleteMember = async (req, res) => {
  const name = req.body.name;
  const groupId = Number(req.body.groupId);
  try {
    const user = await User.findOne({ where: { name: name } });
    const userId = user.dataValues.id;
    const groupUser = await GroupUser.findOne({
      where: { userId: userId, groupId: groupId },
    });
    await groupUser.destroy();
    res.status(200).json({ message: "Member deleted from group" });
  } catch (err) {
    console.log(err);
  }
};
