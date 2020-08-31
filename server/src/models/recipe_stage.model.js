// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const { recipe } = sequelizeClient.models;
  const recipe_stage = sequelizeClient.define('recipe_stage', {
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
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descriprion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description can\'t be empty'
        },
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  recipe_stage.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    recipe_stage.belongsTo(models.recipe, {
      foreignKey: 'id',
      as: 'recipe'
    });
  };

  return recipe_stage;
};