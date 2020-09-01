const _ = require('lodash');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [
      async (hook) => {
        const { app, id } = hook;
        const sequelizeClient = app.get('sequelizeClient');

        const {
          recipe,
          recipe_ingredient,
          recipe_stage,
          ingredient,
          user,
          alternative_recipe_ingredient,
        } = sequelizeClient.models;

        const recipeData = await recipe
          .findOne({
            where: {
              id,
            },
            include: [
              {
                model: recipe_ingredient,
                as: 'ingredients',
                required: false,
                where: {
                  recipeId: id,
                },
                include: [
                  {
                    model: ingredient,
                    as: 'ingredient',
                    required: false,
                  },
                  {
                    model: alternative_recipe_ingredient,
                    as: 'alternativeIngredient',
                    required: false,
                    include: [
                      {
                        model: ingredient,
                        as: 'altIngredient',
                        required: false,
                      },
                    ],
                  },
                ],
              },
              {
                model: recipe_stage,
                as: 'stages',
                required: false,
                where: {
                  recipeId: id,
                },
              },
              {
                model: user,
                as: 'author',
                required: false,
                attributes: ['userName'],
              },
            ],
          })
          .then((result) => JSON.parse(JSON.stringify(result)));

        console.log(recipeData);

        hook.result = recipeData;

        return hook;
      },
    ],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async (hook) => {
        const { app, data, result } = hook;
        const sequelizeClient = app.get('sequelizeClient');

        const {
          ingredient: ingredientModel,
          recipe_ingredient: recipeIngredientModel,
          recipe_stage: recipeStageModel,
          alternative_recipe_ingredient: altRecipeIngredientModel
        } = sequelizeClient.models;
        // console.log(data.ingredients);
        try {
          const createIngredientsPromises = _.map(data.ingredients,
            async (ingredientItem) => {
              console.log(ingredientItem.altIngredient);
              const ingredientData = await ingredientModel.findOrCreate({
                where: { ingredientName: ingredientItem.ingredientName },
                defaults: {
                  ingredientName: ingredientItem.ingredientName,
                },
              }).then((result) => JSON.parse(JSON.stringify(result[0])));
              
              
              const recipeIngredientData = await recipeIngredientModel.create({
                recipeId: result.id,
                ingredientAmount: ingredientItem.ingredientAmount,
                unit: ingredientItem.unit,
                ingredientId: ingredientData.id
              });
              console.log(recipeIngredientData.id);

              const altRecipeIngredientData = await altRecipeIngredientModel.create({
                recipeIngredientId: recipeIngredientData.id,
                ingredientAmount: ingredientItem.altIngredient.ingredientAmount,
                unit: ingredientItem.altIngredient.unit,
                ingredientId: ingredientData.id
              });
              return [ingredientData, recipeIngredientData, altRecipeIngredientData];
            }
          );

          const createStagesPromises = _.map(data.stages,
            async (stageItem, i) => {
              return await recipeStageModel.create({
                recipeId: result.id,
                description: stageItem.description,
                index: i
              }).then((result) => JSON.parse(JSON.stringify(result)));
  
            }
          );
  
          await Promise.all(createIngredientsPromises).then((result) => JSON.parse(JSON.stringify(result)));
          await Promise.all(createStagesPromises).then((result) => JSON.parse(JSON.stringify(result)));
  
        } catch (error) {
          console.log(error);
        }


        return hook;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
