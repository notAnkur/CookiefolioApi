const route = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../Services/User.service');

const verifyToken = require('../utils/verifyToken');

route.post('/signup', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) =>{
      if(err) console.error(err);
      const userData = {
        username: req.body.username,
        passwordHash: hash,
        address: req.body.address,
        accessLevel: 1
      }
      //save
      const user = await UserService.newUser(userData);
      if(user) {
        res.status(200).json({isOpSuccess: true, username: user.username, message: 'Signup successful'});
      } else {
        res.status(400).json({isOpSuccess: false, message: 'User already exist'});
      }
    });
  });
});

route.post('/login', async (req, res) => {
  const user = await UserService.findUser(req.body.username);
  if(user) {
    bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
      if(err) console.error(err);
      if(result) {
        const userProfile = {
          username: user.username,
          address: user.address
        }
        jwt.sign({username: user.username, accessLevel: user.accessLevel}, process.env.JWT_SECRET, {expiresIn: '2d'}, (err, token) => {
          if(err) console.error(err);
          res.status(200).json({token, userProfile, isOpSuccess: true, message: "Successful login"});
        });
      } else {
        res.status(400).json({isOpSuccess: false, message: "Wrong Password"});
      }
    });
  } else {
    res.status(400).json({isOpSuccess: false, message: "User doesn\'t exist"});
  }
});

module.exports = route;