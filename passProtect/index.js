require('dotenv').config()
const bcrypt = require('bcryptjs');


// first generate a random salt
function genSalt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve({
          salt: salt,
          password: password
        });
      }
    });
  });
}

// hash the password with the salt
function genHash(salt, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve({
          salt: salt,
          password: password,
          hash: hash
        });
      }
    });
  });
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  comparePass : (userPassword, databasePassword) =>{
    return bcrypt.compareSync(userPassword, databasePassword);
  },
  genSalt,
  genHash
};
