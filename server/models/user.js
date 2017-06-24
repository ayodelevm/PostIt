import passportLocalSequelize from 'passport-local-sequelize';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isApproved(value) {
          const regExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          if (!regExp.test(value)) {
            throw new Error('Password must be a min of 8 letters with atleast a symbol, upper and lower case letters and a number');
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mysalt: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Group);
        User.hasMany(models.Message);
        // User.belongsTo(models.Group, {
        //   foreignKey: 'GroupId',
        //   // deferrable: DataTypes.Deferrable.INITIALLY_DEFERRED,
        //   onDelete: 'CASCADE'
        // });
        // associations can be defined here
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
