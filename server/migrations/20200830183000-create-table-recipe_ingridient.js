'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipe_ingredient', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      recipeId: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
      },
      ingredientId: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
      },
      ingredientAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      
      unit: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('recipe_ingredient');
  }
};
