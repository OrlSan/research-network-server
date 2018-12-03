var assert = require('assert');
const should = require('should');
describe('\n\n________________________PROJECT__________________', () => {
 
    beforeEach(() => {
        return factory.createMany('project', 10).
        then(projects => {
          console.log("** Created 10 projects");
        })
        .catch(err => {
          console.log("Error", err);
        });
    });
    describe('Find all projects', () => {
      it('should find all projects', () => {
        return Project.findAll({}).then(results => {
          results.should.be.an.Object();
          results.should.be.not.empty();
          results.forEach(result => {
            let project = result.toJSON();
            project.should.have.keys('name', 'description');
          });
        });
      });
    });
});
