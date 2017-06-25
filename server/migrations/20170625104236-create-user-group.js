module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('UserGroups', {
      GroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'username'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('UserGroups');
  }
};
