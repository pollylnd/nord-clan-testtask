'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ingredient', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      ingredientName: {
        type: Sequelize.STRING,
        allowNull: true
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('ingredient');
  }
};
