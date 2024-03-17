const bcrypt = require('bcrypt');

const generateHash = (val) => {
  return bcrypt.hashSync(val, 8);
}

const compareHash = () => {

}

module.exports = {
  generateHash,
  compareHash
}