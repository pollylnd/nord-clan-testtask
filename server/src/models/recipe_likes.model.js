// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const recipe_likes = sequelizeClient.define('recipe_likes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      validate: {
        isUUID: {
          args: 4,
          msg: 'recipeIdUUIDMust4'
        },
        notEmpty: {
          msg: 'recipeIdNotNull'
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true,
        validate: {
          isUUID: {
            args: 4,
            msg: 'userIdUUIDMust4'
          },
          notEmpty: {
            msg: 'userIdNotNull'
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE
      },
  
      updatedAt: {
        type: DataTypes.DATE
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  recipe_likes.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    recipe_likes.belongsTo(models.recipe, {
      foreignKey: 'id',
      as: 'recipe'
    });
    recipe_likes.belongsTo(models.user, {
      foreignKey: 'id',
      as: 'user'
    });
  };

  return recipe_likes;
};
