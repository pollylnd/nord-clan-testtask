// Initializes the `recipe_stage` service on path `/recipe_stage`
const { RecipeStage } = require('./recipe_stage.class');
const createModel = require('../../models/recipe_stage.model');
const hooks = require('./recipe_stage.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recipe_stage', new RecipeStage(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recipe_stage');

  service.hooks(hooks);
};