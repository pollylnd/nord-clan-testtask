// Initializes the `recipe_ingredient` service on path `/recipe_ingredient`
const { RecipeIngredient } = require('./recipe_ingredient.class');
const createModel = require('../../models/recipe_ingredient.model');
const hooks = require('./recipe_ingredient.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recipe_ingredient', new RecipeIngredient(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recipe_ingredient');

  service.hooks(hooks);
};