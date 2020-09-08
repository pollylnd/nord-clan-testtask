// Initializes the `alternative_recipe_ingredient` service on path `/alternative_recipe_ingredient`
const { AlternativeRecipeIngredient } = require('./alternative_recipe_ingredient.class');
const createModel = require('../../models/alternernative_recipe_ingredient.model.js');
const hooks = require('./alternative_recipe_ingredient.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/alternative_recipe_ingredient', new AlternativeRecipeIngredient(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('alternative_recipe_ingredient');

  service.hooks(hooks);
};
