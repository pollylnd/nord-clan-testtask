// Initializes the `recipe_likes` service on path `/recipe-likes`
const { RecipeLikes } = require('./recipe_likes.class');
const createModel = require('../../models/recipe_likes.model');
const hooks = require('./recipe_likes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recipe_likes', new RecipeLikes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recipe_likes');

  service.hooks(hooks);
};
