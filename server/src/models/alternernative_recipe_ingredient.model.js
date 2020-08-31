// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const { recipe } = sequelizeClient.models;
  const alternative_recipe_ingredient = sequelizeClient.define('alternative_recipe_ingredient', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    recipeIngredientId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      validate: {
        isUUID: {
          args: 4,
          msg: 'recipeIngredientIdUUIDMust4'
        },
        notEmpty: {
          msg: 'recipeIngredientIdNotNull'
        },
        isExist: async id => {
          await recipe.find({ where: { id } })
            .then(res => {
              if (!res) {
                throw new Error('recipeIngredientIdNotFound');
              } else {
                if (res.dataValues && res.dataValues.isDeleted) {
                  throw new Error('recipeIngredientIdIsDeleted');
                }
              }
            });
        }
      }
    },
    ingredientAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false
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
  alternative_recipe_ingredient.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // alternative_recipe_ingredient.belongsTo(models.recipe_ingredient, {
    //   foreignKey: 'recipeIngredientId',
    //   as: 'recipeIngredientInfo'
    // });
  };

  return alternative_recipe_ingredient;
};