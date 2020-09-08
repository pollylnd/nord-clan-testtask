'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
  
      userName: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
  
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user');
  }
};
