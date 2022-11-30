const register = require('../routes/users');
const login = require('./login');
const getUserById = require('./getUserById');

module.exports = {
  register,
  login,
  getUserById,
};
