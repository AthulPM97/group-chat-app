const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
  return jwt.sign({ id: id }, process.env.SECRET_KEY);
}

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
          token: generateAccessToken(user.id),
        });
      });
    }
  } catch (err) {
    console.log("error signin up", err);
  }
};

exports.postUserLogin = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({where: {email: email}});
    if(user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) {
          res.status(401).json({message: 'Password does not match!'});
        }
        if(result) {
          res.status(200).json({message: 'Successfully logged in!', token: generateAccessToken(user.id)});
        }
      })
    } else {
      res.status(404).json({message: 'User not found...'});
    }
  }catch(err){
    console.log(err);
  }
};
