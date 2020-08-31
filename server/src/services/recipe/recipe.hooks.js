/* eslint-disable no-unused-vars */


module.exports = {
  before: {
    all: [],
    find: [
      
    ],
    get: [
      async hook => {
        const { app, id } = hook;
        const sequelizeClient = app.get('sequelizeClient');

        const { recipe, recipe_ingredient, recipe_stage, ingredient, user } = sequelizeClient.models;
        
        const recipeData = await recipe.findOne({
          include: [
            {
              model: recipe_ingredient,
              as: 'ingredients',
              required: false,
              where: {
                recipeId: id
              },
              include: [{
                model: ingredient,
                as: 'ingredient',
                required: false,
              }]
            },
            {
              model: recipe_stage,
              as: 'stages',
              required: false,
              where: {
                recipeId: id
              },
            },
            {
              model: user,
              as: 'author',
              required: false,
              attributes: [
                'userName'
              ]            
            },
          ]
        }).then(result => JSON.parse(JSON.stringify(result)));

        hook.result = recipeData;
        
        return hook;
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
