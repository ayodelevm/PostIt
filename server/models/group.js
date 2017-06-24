

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    // groupMembersId: {
    //   type: DataTypes.ARRAY(DataTypes.TEXT),
    //   allowNull: false,
    //   defaultValue: DataTypes.UUIDV4,
    //   references: {
    //     model: 'Users',
    //     key: 'id',
    //     deferrable: DataTypes.Deferrable.INITIALLY_DEFERRED
    //   }
    // }
  }, {
    classMethods: {
      associate: (models) => {
        // Group.hasMany(models.User);
        Group.hasMany(models.Message);
        Group.belongsTo(models.User, {
          foreignKey: 'UserId',
          deferrable: DataTypes.Deferrable.INITIALLY_DEFERRED,
          onDelete: 'CASCADE'
        });
        // associations can be defined here
      }
    }
  });
  return Group;
};
