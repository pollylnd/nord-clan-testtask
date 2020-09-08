// Initializes the `recipe` service on path `/recipe`
const { Recipe } = require('./recipe.class');
const createModel = require('../../models/recipe.model');
const hooks = require('./recipe.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recipe', new Recipe(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recipe');

  service.hooks(hooks);
};
