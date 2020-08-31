// Initializes the `ingredient` service on path `/ingredient`
const { Ingredient } = require('./ingredient.class');
const createModel = require('../../models/ingredient.model');
const hooks = require('./ingredient.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ingredient', new Ingredient(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ingredient');

  service.hooks(hooks);
};