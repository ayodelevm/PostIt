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
      type: DataTypes.STRING,
      // allowNull: false
    },
    googleSubId: {
      type: DataTypes.STRING
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
      defaultValue: 'https://res.cloudinary.com/dr6ynr4o0/image/upload/v1506624353/alygvc4f2hm2kjxokgps.jpg'
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message);
        User.belongsToMany(models.Message, {
          through: 'MessageUser',
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
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
    if (user.password) {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  });

  return User;
};
