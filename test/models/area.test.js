var assert = require('assert');
const should = require('should');
describe('\n\n________________________AREA__________________', () => {
 
    beforeEach(() => {
        return factory.createMany('area', 10).
        then(areas => {
          console.log("** Created 10 areas");
        })
        .catch(err => {
          console.log("Error", err);
        });
    });
    describe('Find all areas', () => {
      it('should find all areas', () => {
        return Area.findAll({}).then(areas => {
          areas.should.be.an.Object();
          areas.should.be.not.empty();
          areas.forEach(result => {
            let area = result.toJSON();
            area.should.have.keys('name', 'image_url');
          });
        });
      });
    });
});
