const bcrypt = require('bcrypt');
const AdminsModel = require('../models/admins');

exports.check_login = (req, res) => {
  const {
    username,
  } = req.body;
  const {
    password,
  } = req.body;

  if (username && password) {
    AdminsModel.findAll({
      where: {
        username,
      },
    }).then(
      (data) => {
        if (data.length > 0) {
          const dataBasePassword = data[0].dataValues.password;
          bcrypt.compare(password, dataBasePassword).then((isEqual) => {
            if (isEqual === true) {
              req.session.loggedin = true;
              req.session.username = username;
              req.session.authority = data[0].dataValues.authority;
              res.redirect('/');
              res.status(200);
              res.end();
            } else {
              res.send('Hibás felhasználónév vagy jelszó!');
            }
          }).catch(err => console.log(err));
        } else {
          res.send('Incorrect Username and/or Password!');
        }
      },
    ).catch(err => console.log(err));
  }
};