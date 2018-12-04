var assert = require('assert');
const should = require('should');
describe('\n\n________________________AREA________________________', () => {
  describe('\n--------------Validations on creation--------------\n', () => {
    let area;
    it('should create valid area with required properties', () => {
      return factory.create('area')
      .then(areaCreated => {
        area = areaCreated;
        areaCreated.should.be.not.empty();
        areaCreated.should.be.an.Object();
        areaCreated.should.have.property('id');
        areaCreated.should.have.property('name');
        areaCreated.should.have.property('image_url');
      });
    });
    it('should find area created', () => {
      area = area.dataValues;
      return Area.findOne({ where: { id: area.id }}).then(areaFinded => {
        areaFinded.should.be.an.Object();
        areaFinded.should.be.not.empty();
        areaFinded.should.have.property('name', area.name);
      });
    });
  });
});