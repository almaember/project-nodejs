const Sequelize = require('sequelize');

const enviroment = process.env.NODE_ENV;

if (enviroment === 'development') {
  module.exports = new Sequelize({
    database: 'cga4yj2zn5orf0jg',
    username: 'v8i7a9ew1jtox913',
    password: 'gdvt5szqaqcqg9zv',
    host: 'g4yltwdo6z0izlm6.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    dialect: 'mariadb',
    define: {
      timestamps: false,
    },
  });
} else if (enviroment === 'production') {
  module.exports = new Sequelize({
    database: 'kreativliget',
    username: 'kreativliget_db',
    password: 'jelszo',
    host: '194.5.157.84',
    dialect: 'mariadb',
    define: {
      timestamps: false,
    },
  });
} else {
  throw new Error(`Enviroment is ${enviroment}!`);
}
