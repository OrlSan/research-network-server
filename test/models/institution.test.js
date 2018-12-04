var assert = require('assert');
const should = require('should');
describe('\n\n________________________INSTITUTION________________________', () => {
  describe('\n--------------Validations on creation--------------\n', () => {
    let institution;
    it('should create valid institution with required properties', () => {
      return factory.create('institution')
      .then(institutionCreated => {
        institution = institutionCreated;
        institutionCreated.should.be.not.empty();
        institutionCreated.should.be.an.Object();
        institutionCreated.should.have.property('id');
        institutionCreated.should.have.property('name');
        institutionCreated.should.have.property('faculty');
        institutionCreated.should.have.property('country');
        institutionCreated.should.have.property('state');
        institutionCreated.should.have.property('email');
        institutionCreated.should.have.property('address');
      });
    });
    it('should find institution created', () => {
      institution = institution.dataValues;
      return Institution.findOne({ where: { id: institution.id }}).then(institutionFinded => {
        institutionFinded.should.be.an.Object();
        institutionFinded.should.be.not.empty();
        institutionFinded.should.have.property('name', institution.name);
      });
    });
  });
});