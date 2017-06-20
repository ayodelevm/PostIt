import dotenv from 'dotenv';
import Sequelize from 'sequelize';

import User from './user';

const env = process.env.NODE_ENV || 'development';
const config = require('./../config.json')[1][env];

const sequelize = new Sequelize(config.database, config.username, process.env.SECRET, {
  dialect: config.dialect,

});

const CreateGroup = sequelize.define('CreateGroup', {
  groupName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: Sequelize.TEXT,
  owner: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username',
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED
    }
  },
});

export default CreateGroup;
