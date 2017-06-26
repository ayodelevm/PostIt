module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true,
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
