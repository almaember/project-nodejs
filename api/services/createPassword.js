const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = function GeneratePw(password) {
  this.jelszavak = [password];
  this.hashArr = [];

  this.name = function name() {
    this.jelszavak.forEach((jelszo) => {
      const cryptedPass = bcrypt.hashSync(jelszo, 10);
      this.hashArr.push(cryptedPass);
      fs.appendFileSync('jelszavak.txt', `${jelszo} - ${cryptedPass}\n`);
    });
  };
};