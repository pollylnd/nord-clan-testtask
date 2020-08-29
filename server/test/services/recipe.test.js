const app = require('../../src/app');

describe('\'recipe\' service', () => {
  it('registered the service', () => {
    const service = app.service('recipe');
    expect(service).toBeTruthy();
  });
});
