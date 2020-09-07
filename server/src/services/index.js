const user = require('./user/user.service.js');
const recipe = require('./recipe/recipe.service.js');
const ingredient = require('./ingredient/ingredient.service.js');
const alternative_recipe_ingredient = require('./alternative_recipe_ingredient/alternative_recipe_ingredient.service.js');
const recipe_ingredient = require('./recipe_ingredient/recipe_ingredient.service.js');
const recipe_stage = require('./recipe_stage/recipe_stage.service.js');
const uploads = require('./uploads/uploads.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(recipe);
  app.configure(ingredient);
  app.configure(alternative_recipe_ingredient);
  app.configure(recipe_ingredient);
  app.configure(recipe_stage);
  app.configure(uploads);
};
