const request = require('supertest');

describe('\n\n________________________USER_ROUTES________________________', () => {
  describe('\n--------------Validations on get--------------\n', () => {
    let area;
    it('should create valid area with required properties', () => {
      return factory.createMany('user', 3)
      .then(() => {
        return request("http://localhost:3000")
        .get('/users')
        .expect(200)
      })
      .then((response) => {
        //response.body.should.have.length(3);
      });
    });
  });
});