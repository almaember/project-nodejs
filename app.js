const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const dbs = require('./api/db/db');

const CheckLoginService = require('./api/services/checkLogin');
const CheckLoginIndexService = require('./api/services/checkLoginIndex');

const app = express();
const port = process.env.PORT || 3000;

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));
// parse application/json
app.use(bodyParser.json());


// Test Database
dbs.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));


app.use('/login', require('./api/routes/login'));
app.use('/webhooks', require('./api/routes/webhooks'));

// Serving static files
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', CheckLoginIndexService, express.static(path.join(__dirname, 'dist')));

app.use('/api', CheckLoginService, require('./api/routes/api'));

app.get('*', CheckLoginIndexService, (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`public/${req.url}`));
  } else {
    res.sendFile(path.resolve('dist/index.html'));
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));