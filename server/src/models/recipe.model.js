// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  // const { user } = sequelizeClient.models;
  const recipe = sequelizeClient.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    authorId: {
      type: DataTypes.UUID,
      foreignKey: true,
      // validate: {
      //   isUUID: {
      //     args: 4,
      //     msg: 'authorIdUUIDMust4'
      //   },
      //   isExist: async id => {
      //     await user.findOne({ where: { id } })
      //       .then(res => {
      //         if(!res) {
      //           throw new Error('authorIdNotFound');
      //         } else {
      //           if(res.dataValues && res.dataValues.isDeleted) {
      //             throw new Error('authorIsDeleted');
      //           }
      //         }
      //       });
      //   }
      // }
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Recipe name can\'t be empty',
        },
        max: {
          args: 150,
          msg: 'recipeNameMaxErr'
        }
      }
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },

    complexity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Complexity name can\'t be empty'
        },
      }
    },

    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    description: {
      type: DataTypes.TEXT
    },

    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {    
        notEmpty: {
          msg: 'Category can\'t be empty'
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
  recipe.associate = function (models) {
    // recipe.belongsToMany(models.ingredient, {
    //   through: models.recipe_ingredient
    // });
    recipe.belongsTo(models.user, {
      foreignKey: 'authorId',
      as: 'author' 
    });
    recipe.hasMany(models.recipe_ingredient , {
      foreignKey: 'recipeId',
      as: 'ingredients'
    });
    recipe.hasMany(models.recipe_stage , {
      foreignKey: 'recipeId',
      as: 'stages'
    });
    recipe.hasMany(models.recipe_likes , {
      foreignKey: 'recipeId',
      as: 'recipeLikes'
    });
  };

  return recipe;
};
