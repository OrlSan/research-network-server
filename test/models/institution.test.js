var assert = require('assert');
const should = require('should');
describe('\n\n________________________INSTITUTION__________________', () => {
 
    beforeEach(() => {
        return factory.createMany('institution', 10).
        then(users => {
          console.log("** Created 10 institutions");
        })
        .catch(err => {
          console.log("Error", err);
        });
    });
    describe('Find all institutions', () => {
      it('should find all institutions', () => {
        return Institution.findAll({}).then(results => {
          results.should.be.an.Object();
          results.should.be.not.empty();
          results.forEach(result => {
            let institution = result.toJSON();
            institution.should.have.keys('name', 'faculty');
          });
        });
      });
    });
});
