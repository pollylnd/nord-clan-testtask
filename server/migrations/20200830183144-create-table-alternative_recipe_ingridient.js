'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('alternative_recipe_ingredient', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      recipeIngredientId: {
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
      createdAt: {
        type: Sequelize.DATE
      },
  
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('alternative_recipe_ingredient');
  }
};
