const express = require('express');
const fs = require('fs');
const path = require('path');
const routerUser = express.Router();

const userDataPath = path.join(__dirname, '../user.json');

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get('/profile', (req, res, next) => {
  fs.readFile(userDataPath, 'utf8', (err, data) => {
    if (err) return next(err);
    res.json(JSON.parse(data));
  });
});

routerUser.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  fs.readFile(userDataPath, 'utf8', (err, data) => {
    if (err) return next(err);

    const user = JSON.parse(data);

    if (username !== user.username) {
      return res.send({
        status: false,
        message: "User Name is invalid"
      });
    }

    if (password !== user.password) {
      return res.send({
        status: false,
        message: "Password is invalid"
      });
    }

    return res.send({
      status: true,
      message: "User Is valid"
    });
  });
});

routerUser.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logout.<b>`);
});

module.exports = routerUser;