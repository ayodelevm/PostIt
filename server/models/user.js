import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    telephone: {
      type: DataTypes.STRING
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
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.conncoll.edu/media/major-images/Art.jpg'
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message);
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

  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  return User;
};
