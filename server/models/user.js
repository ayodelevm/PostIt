import passportLocalSequelize from 'passport-local-sequelize';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING
    },
    mysalt: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Group, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
        User.belongsToMany(models.Group, {
          through: 'UserGroup',
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });

  passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    hashField: 'password',
    saltField: 'mysalt'
  });

  return User;
};
