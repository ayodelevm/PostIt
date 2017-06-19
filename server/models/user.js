const Sequelize = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');

const sequelize = new Sequelize('postit', 'postgres', 'ayo3276dapov', {
  dialect: 'postgres',

});

const User = passportLocalSequelize.defineUser(sequelize, {
  favoriteColor: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN,
  email: Sequelize.STRING,
  fullName: Sequelize.STRING
});

User.sync();

module.exports = User;
