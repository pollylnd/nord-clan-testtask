

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async hook => {
        const { app, data } = hook;
        const sequelizeClient = app.get("sequelizeClient");

        const { recipe_likes: recipeLikesModel } = sequelizeClient.models;

        const recipeLikes = await recipeLikesModel.findAndCountAll({
          where: {
            recipeId: data.recipeId,
          },
        }).then((result) => JSON.parse(JSON.stringify(result)));

        await app.service("recipe").patch(data.recipeId, {
          likes: recipeLikes.count
        });

        return hook;
      },
    ],
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
