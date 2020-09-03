const _ = require("lodash");
const { Sequelize, Op } = require("sequelize");

module.exports = {
  before: {
    all: [],
    find: [
      async (hook) => {
        const { app, params } = hook;
        const sequelizeClient = await app.get("sequelizeClient");

        try {
          const { 
            recipe: recipeModel,
            recipe_ingredient: recipeIngredientModel,
            ingredient: ingredientModel,
          } = sequelizeClient.models;

          const recipeSearch = params.query.recipeSearch;
          const complexity = params.query.complexity;

          delete params.query.recipeSearch;
          delete params.query.recipeSearch;

          let query = {};

          if (recipeSearch) {
            query[Op.or] = [
              {
                '$recipe.name$': {
                  [Op.iLike]: '%' + recipeSearch + '%'
                },
              },
              {
                '$ingredients.ingredient.ingredientName$': {
                  [Op.iLike]: '%' + recipeSearch + '%'
                }
              },
            ];
          }

          if (complexity) {
            query[Op.eq] = complexity;
          }

          const result = await recipeModel.findAll({
            where: {
              isDeleted: false,
              ...query,
            },
            include: [
              {
                model: recipeIngredientModel,
                as: "ingredients",
                required: false,
                include: [
                  {
                    model: ingredientModel,
                    as: "ingredient",
                    required: false,
                  },
                ],
              },
            ]
          }).then((result) => JSON.parse(JSON.stringify(result)));

          hook.result = {
            data: result,
          };
        } catch (error) {
          console.log(error);
        }

        return hook;
      },
    ],
    get: [
      async (hook) => {
        const { app, id } = hook;
        const sequelizeClient = app.get("sequelizeClient");

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
                as: "ingredients",
                required: false,
                where: {
                  recipeId: id,
                },
                include: [
                  {
                    model: ingredient,
                    as: "ingredient",
                    required: false,
                  },
                  {
                    model: alternative_recipe_ingredient,
                    as: "alternativeIngredient",
                    required: false,
                    include: [
                      {
                        model: ingredient,
                        attributes: ["ingredientName"],
                        as: "altIngredient",
                      },
                    ],
                  },
                ],
              },
              {
                model: recipe_stage,
                as: "stages",
                where: {
                  recipeId: id,
                },
              },
              {
                model: user,
                as: "author",
                required: false,
                attributes: ["userName"],
              },
            ],
          })
          .then((result) => JSON.parse(JSON.stringify(result)));

        _.forEach(recipeData.ingredients, (ingredientItem, key) => {
          if (recipeData.ingredients[key].alternativeIngredient) {
            recipeData.ingredients[key].alternativeIngredient.ingredientName =
              ingredientItem.alternativeIngredient.altIngredient.ingredientName;

            delete recipeData.ingredients[key].alternativeIngredient
              .altIngredient;
          }
        });

        const sortedStages = recipeData.stages.sort(
          (a, b) => a.index - b.index
        );
        recipeData.stages = sortedStages;

        hook.result = recipeData;

        return hook;
      },
    ],
    create: [],
    update: [],
    patch: [
      async (hook) => {
        const { app, data, id } = hook;
        const sequelizeClient = app.get("sequelizeClient");

        const {
          ingredient: ingredientModel,
          recipe_ingredient: recipeIngredientModel,
          recipe_stage: recipeStageModel,
          alternative_recipe_ingredient: altRecipeIngredientModel,
        } = sequelizeClient.models;

        try {
          // delete all recipe-ingredients and alt-recipe-ingredients
          const recipeIngredients = await recipeIngredientModel
            .findAll({
              where: {
                recipeId: id,
              },
            })
            .then((result) => JSON.parse(JSON.stringify(result)));

          const destroyAltRecipeIngredientsPromises = _.map(
            recipeIngredients,
            async (recipeIngredient) => {
              return await altRecipeIngredientModel.destroy({
                where: {
                  recipeIngredientId: recipeIngredient.id,
                },
              });
            }
          );

          await Promise.all(destroyAltRecipeIngredientsPromises);

          await recipeIngredientModel.destroy({
            where: {
              recipeId: id,
            },
          });

          await recipeStageModel.destroy({
            where: {
              recipeId: id,
            },
          });

          // find or create ingredient
          _.map(data.ingredients, async (ingredient) => {
            const ingredientName = ingredient["ingredient.ingredientName"];
            let newIngredient = null;

            if (ingredientName) {
              newIngredient = await ingredientModel
                .findOne({
                  where: {
                    ingredientName,
                  },
                })
                .then((result) => JSON.parse(JSON.stringify(result)));

              if (!newIngredient) {
                newIngredient = await ingredientModel
                  .create({
                    ingredientName,
                  })
                  .then((result) => JSON.parse(JSON.stringify(result)));
              }
            }

            const newRecipeIngredient = await recipeIngredientModel
              .create({
                recipeId: id,
                ingredientAmount: ingredient.ingredientAmount,
                unit: ingredient.unit,
                ingredientId: newIngredient.id,
              })
              .then((result) => JSON.parse(JSON.stringify(result)));

            const altIngredientData = _.get(
              ingredient,
              "alternativeIngredient"
            );
            console.log(altIngredientData);

            let altIngredient = null;
            let newAltIngredient;

            if (altIngredientData) {
              altIngredient = await ingredientModel
                .findOne({
                  where: {
                    ingredientName: altIngredientData.ingredientName,
                  },
                })
                .then((result) => JSON.parse(JSON.stringify(result)));

              if (!altIngredient) {
                altIngredient = await ingredientModel
                  .create({
                    ingredientName: altIngredientData.ingredientName,
                  })
                  .then((result) => JSON.parse(JSON.stringify(result)));
              }

              newAltIngredient = await altRecipeIngredientModel.create({
                recipeIngredientId: newRecipeIngredient.id,
                ingredientAmount: altIngredientData.ingredientAmount,
                unit: altIngredientData.unit,
                ingredientId: altIngredient.id,
              });
            }

            return [
              newIngredient,
              newRecipeIngredient,
              altIngredient,
              newAltIngredient,
            ];
          });

          _.map(data.stages, async (stageItem, i) => {
            let existsRecipeStage = null;
            if (stageItem.id) {
              existsRecipeStage = await recipeStageModel.findOne({
                where: { id: stageItem.id },
              });
            }
            console.log(stageItem);
            if (!existsRecipeStage) {
              return await recipeStageModel
                .create({
                  recipeId: id,
                  description: stageItem.description,
                  index: stageItem.index,
                })
                .then((result) => JSON.parse(JSON.stringify(result)));
            } else {
              return await app
                .service("recipe_stage")
                .patch(stageItem.id, {
                  recipeId: id,
                  description: stageItem.description,
                  index: stageItem.index,
                })
                .then((result) => JSON.parse(JSON.stringify(result)));
            }
          });

          // await Promise.all(createIngredientsPromises).then((result) =>
          //   JSON.parse(JSON.stringify(result))
          // );
          // await Promise.all(createStagesPromises).then((result) =>
          //   JSON.parse(JSON.stringify(result))
          // );
        } catch (error) {
          console.log(error);
        }

        return hook;
      },
    ],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async (hook) => {
        const { app, data, result } = hook;
        const sequelizeClient = app.get("sequelizeClient");

        const {
          ingredient: ingredientModel,
          recipe_ingredient: recipeIngredientModel,
          recipe_stage: recipeStageModel,
          alternative_recipe_ingredient: altRecipeIngredientModel,
        } = sequelizeClient.models;

        try {
          const createIngredientsPromises = _.map(
            data.ingredients,
            async (ingredientItem) => {
              const ingredientData = await ingredientModel
                .findOrCreate({
                  where: { ingredientName: ingredientItem.ingredientName },
                  defaults: {
                    ingredientName: ingredientItem.ingredientName,
                  },
                })
                .then((result) => JSON.parse(JSON.stringify(result[0])));

              const recipeIngredientData = await recipeIngredientModel.create({
                recipeId: result.id,
                ingredientAmount: ingredientItem.ingredientAmount,
                unit: ingredientItem.unit,
                ingredientId: ingredientData.id,
              });

              let altRecipeIngredientData = null;

              if (ingredientItem.altIngredient) {
                altRecipeIngredientData = await altRecipeIngredientModel.create(
                  {
                    recipeIngredientId: recipeIngredientData.id,
                    ingredientAmount:
                      ingredientItem.altIngredient.ingredientAmount,
                    unit: ingredientItem.altIngredient.unit,
                    ingredientId: ingredientData.id,
                  }
                );
              }

              return [
                ingredientData,
                recipeIngredientData,
                altRecipeIngredientData,
              ];
            }
          );

          const createStagesPromises = _.map(
            data.stages,
            async (stageItem, i) => {
              return await recipeStageModel
                .create({
                  recipeId: result.id,
                  description: stageItem.description,
                  index: i,
                })
                .then((result) => JSON.parse(JSON.stringify(result)));
            }
          );

          await Promise.all(createIngredientsPromises).then((result) =>
            JSON.parse(JSON.stringify(result))
          );
          await Promise.all(createStagesPromises).then((result) =>
            JSON.parse(JSON.stringify(result))
          );
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
