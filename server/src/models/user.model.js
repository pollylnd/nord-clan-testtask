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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Имя не может быть пустым'
        },
      }
    },

    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Почта не может быть пустой'
        },
        is: {
          args: ['^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', 'i'],
          regExp: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$',
          msg: 'Неверный формат почты'
        },
        isUnique: async (email) => {
          await user.findOne({ where: { email } })
            .then(result => {
              if (result) {
                throw new Error('Пользователь с данной почтой уже существует');
              }
            });
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    user.hasMany(models.recipe_likes, {
      foreignKey: 'userId',
      as: 'user' 
    });
  };

  return user;
};
