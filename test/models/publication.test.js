var assert = require('assert');
const should = require('should');
describe('\n\n________________________PUBLICATION__________________', () => {
 
    beforeEach(() => {
        return factory.createMany('publication', 10).
        then(publications => {
          console.log("** Created 10 publications");
        })
        .catch(err => {
          console.log("Error", err);
        });
    });
    describe('Find all publications', () => {
      it('should find all publications', () => {
        return Publication.findAll({}).then(results => {
          results.should.be.an.Object();
          results.should.be.not.empty();
          results.forEach(result => {
            let institution = result.toJSON();
            institution.should.have.keys('title', 'type');
          });
        });
      });
    });
});
