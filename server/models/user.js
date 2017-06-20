const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./../config.json')[env];


dotenv.config({ silent: true });


const sequelize = new Sequelize(config.database, config.username, process.env.SECRET, {
  dialect: config.dialect,

});

const User = passportLocalSequelize.defineUser(sequelize, {
  favoriteColor: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN,
  email: Sequelize.STRING,
  fullName: Sequelize.STRING
});

if (env !== 'test') {
  User.sync();
}

module.exports = User;
