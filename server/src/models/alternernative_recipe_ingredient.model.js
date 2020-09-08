// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  // const { recipe_ingredient, ingredient } = sequelizeClient.models;
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
        // isExist: async id => {
        //   await recipe_ingredient.findOne({ where: { id } })
        //     .then(res => {
        //       if (!res) {
        //         throw new Error('recipeIngredientIdNotFound');
        //       } else {
        //         if (res.dataValues && res.dataValues.isDeleted) {
        //           throw new Error('recipeIngredientIdIsDeleted');
        //         }
        //       }
        //     });
        // }
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
        // isExist: async id => {
        //   await ingredient.findOne({ where: { id } })
        //     .then(res => {
        //       if (!res) {
        //         throw new Error('ingredientIdNotFound');
        //       } else {
        //         if (res.dataValues && res.dataValues.isDeleted) {
        //           throw new Error('ingredientIdIsDeleted');
        //         }
        //       }
        //     });
        // }
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
  alternative_recipe_ingredient.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    alternative_recipe_ingredient.belongsTo(models.recipe_ingredient, {
      foreignKey: 'id',
      as: 'ingredient'
    });
    alternative_recipe_ingredient.belongsTo(models.ingredient, {
      foreignKey: 'ingredientId',
      as: 'altIngredient'
    });
  };

  return alternative_recipe_ingredient;
};