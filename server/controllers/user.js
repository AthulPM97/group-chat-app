const User = require("../models/user");

const bcrypt = require("bcrypt");

exports.postUserSignup = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res.status(500).json({ message: "Email already in use!" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = await User.create({
          name,
          email,
          phone,
          password: hash,
        });
        return res.status(201).json({
          message: "User created successfully",
          //   token: generateAccessToken(user.id),
        });
      });
    }
  } catch (err) {
    console.log("error signin up", err);
  }
};
