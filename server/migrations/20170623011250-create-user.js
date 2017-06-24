module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.TEXT,
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
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mysalt: {
        type: Sequelize.STRING
      },
      // GroupId: {
      //   type: Sequelize.UUID,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Groups',
      //     key: 'id',
      //     // deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED
      //   }
      // },
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
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Users');
  }
};
