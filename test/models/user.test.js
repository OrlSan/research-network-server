var assert = require('assert');
const should = require('should');
describe('\n\n________________________USER__________________', () => {
 
    beforeEach(() => {
        return factory.createMany('user', 10).
        then(users => {
          console.log("** Created 10 users");
        })
        .catch(err => {
          console.log("Error", err);
        });
    });
    describe('Find all users', () => {
      it('should find all users', () => {
        return User.findAll({}).then(users => {
          users.should.be.an.Object();
          users.should.be.not.empty();
          users.forEach(result => {
            let user = result.toJSON();
            user.should.have.keys('name', 'lastname', 'date_birth', 'email', 'profile');
          });
        });
      });
    });
});
