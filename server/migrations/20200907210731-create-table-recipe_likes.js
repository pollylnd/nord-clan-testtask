'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipe_likes', {
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
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: false,
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
    return queryInterface.dropTable('recipe_likes');
  }
};