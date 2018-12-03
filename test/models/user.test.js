var assert = require('assert');
const should = require('should');
describe('\n\n________________________USER__________________', () => {
 
    beforeEach(() => {
        console.log('BEFORE voy a crear');
        return factory.createMany('user', 10).
        then(users => {
          console.log("** Created 10 users");
        })
        .catch(err => {
          console.log("Error", err);
        });
    });
    describe('Array', function() {
        describe('#indexOf()', function() {
          it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
          });
        });
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
