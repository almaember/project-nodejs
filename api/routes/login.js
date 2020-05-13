const express = require('express');
const LoginController = require('../controllers/login');

const router = express();

router.get('/', ((req, res) => {
  res.render('login');
}));

router.post('/', LoginController.check_login);

router.get('/exit', ((req, res) => {
  req.session.loggedin = false;
  req.session.username = '';
  req.session.authority = 0;
  res.render('login');
}));

module.exports = router;