const user = require('./user/user.service.js');
const recipe = require('./recipe/recipe.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(recipe);
};
