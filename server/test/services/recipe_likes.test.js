const app = require('../../src/app');

describe('\'recipe_likes\' service', () => {
  it('registered the service', () => {
    const service = app.service('recipe-likes');
    expect(service).toBeTruthy();
  });
});
