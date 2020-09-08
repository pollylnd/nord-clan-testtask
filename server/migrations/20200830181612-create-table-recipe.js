'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipe', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      authorId: {
        type: Sequelize.UUID,
        foreignKey: true,
      },
      
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
  
      complexity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  
      likes: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
  
      description: {
        type: Sequelize.TEXT
      },
  
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('recipe');
  }
};
