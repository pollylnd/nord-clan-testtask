// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const { recipe } = sequelizeClient.models;
  const recipe_ingredient = sequelizeClient.define('recipe_ingredient', {
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
        isExist: async id => {
          await recipe.findOne({ where: { id } })
            .then(res => {
              if (!res) {
                throw new Error('recipeIdNotFound');
              } else {
                if (res.dataValues && res.dataValues.isDeleted) {
                  throw new Error('recipeIdIsDeleted');
                }
              }
            });
        }
      }
    },
    ingredientId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      validate: {
        isUUID: {
          args: 4,
          msg: 'ingredientIdUUIDMust4'
        },
        notEmpty: {
          msg: 'ingredientIdNotNull'
        },
      }
    },
    ingredientAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Unit can\'t be empty',
        },
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  recipe_ingredient.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    recipe_ingredient.belongsTo(models.recipe, {
      foreignKey: 'id',
      as: 'recipe'
    });
    recipe_ingredient.belongsTo(models.ingredient, {
      foreignKey: 'ingredientId',
      as: 'ingredient'
    });
    recipe_ingredient.hasOne(models.alternative_recipe_ingredient, {
      foreignKey: 'recipeIngredientId',
      as: 'alternativeIngredient',
    });
  };

  return recipe_ingredient;
};