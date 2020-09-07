// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user = sequelizeClient.define('user', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'emailNotNull'
        },
        not: {
          args: ['^[а-яА-я]*$', 'i'],
          regExp: '^[а-яА-я]*$',
          msg: 'notHasBeenCyrillic'
        },
        isEmail: {
          msg: 'emailNotValid'
        },
        max: {
          args: 320,
          msg: 'emailMaxErr'
        },
        isLowercase: {
          msg: 'isLowercaseEmailErr'
        },
        isUnique: async (email) => {
          await user.findOne({ where: { email } })
            .then(result => {
              if (result) {
                throw new Error('isExistEmail');
              }
            });
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'passwordNotNull'
        },
        min: {
          args: 6,
          msg: 'PasswordLengthSmall'
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
  user.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    user.hasMany(models.recipe, {
      foreignKey: 'authorId',
      as: 'author' 
    });
  };

  return user;
};
