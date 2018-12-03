const factory = require('factory-girl').factory;
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
describe('UserTests', () => {
    before(() => {
        console.log('BEFORE voy a crear');
        factory.createMany('user', 10).
        then(users => {
          console.log("** Created 10 users");
        })
        .catch(err => {
          console.log("Error", err);
        });
    //   return Promise.all([
    //     factory.createMany('editorial', 3),
    //     factory.create('serie'),
    //   ]).then(result => {
    //     return result[1].addEditorial(result[0]);
    //   }).then(() => {
    //     return Promise.all([
    //       factory.create('editorial', { name: 'Amalgama' }),
    //       factory.createMany('serie', 3),
    //     ]);
    //   }).then(result => {
    //     return result[0].addSerie(result[1]);
    //   });
    });
  
    describe('Find all users', () => {
      it('should find all users', () => {
        return User.findAll({}).then(users => {
          users.should.be.an.Object();
          users.should.be.not.empty();
          users.forEach(result => {
            let user = result.toJSON();
            user.should.have.keys('name', 'lastname');
          });
        });
      });
    });
  });