// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const { ingridient, recipe } = sequelizeClient.models;
  const recipe_ingridient = sequelizeClient.define('recipe_ingridient', {
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
          await recipe.find({ where: { id } })
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
    ingridientId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      validate: {
        isUUID: {
          args: 4,
          msg: 'ingridientIdUUIDMust4'
        },
        notEmpty: {
          msg: 'ingridientIdNotNull'
        },
        isExist: async id => {
          await ingridient.find({ where: { id } })
            .then(res => {
              if (!res) {
                throw new Error('ingridientIdNotFound');
              } else {
                if (res.dataValues && res.dataValues.isDeleted) {
                  throw new Error('ingridientIdIsDeleted');
                }
              }
            });
        }
      }
    },
    ingridientAmount: {
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
  recipe_ingridient.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    recipe_ingridient.belongsTo(models.recipe, {
      foreignKey: 'recipeId',
      as: 'recipe'
    });
    recipe_ingridient.belongsTo(models.ingridient, {
      foreignKey: 'ingridientId',
      as: 'ingridient'
    });
    // alternative_recipe_ingridient
  };

  return recipe_ingridient;
};