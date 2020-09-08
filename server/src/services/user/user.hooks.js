const { authenticate } = require('@feathersjs/authentication').hooks;
const _ = require("lodash");

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [
      async hook => {
        const { app, result } = hook;
        const sequelizeClient = app.get("sequelizeClient");

        const { recipe_likes: recipeLikesModel } = sequelizeClient.models;

        const recipeLikes = await recipeLikesModel.findAll({
          where: {
            userId: result.id,
          },
          attributes: ["recipeId"],
        }).then((result) => JSON.parse(JSON.stringify(result)));

        hook.result = {
          ...hook.result,
          recipeLikes: _.map(recipeLikes, 'recipeId')
        };

        return hook;
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
