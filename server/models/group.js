module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'A group with this name already exist'
      },
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Message);
        Group.belongsToMany(models.User, {
          through: 'UserGroup',
          foreignKey: 'GroupId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Group;
};
