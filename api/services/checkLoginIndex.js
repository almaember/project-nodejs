const express = require('express');

const router = express();

router.use((req, res, next) => {
  if (req.session && req.session.loggedin === true && req.session.username) {
    next();
  } else {
    return res.redirect('/login');
  }
});

module.exports = router;