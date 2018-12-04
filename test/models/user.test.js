var assert = require('assert');
const should = require('should');
describe('\n\n________________________USER________________________', () => {
  describe('\n--------------Validations on creation--------------\n', () => {
    let user;
    it('should create valid user with required properties', () => {
      return factory.create('user')
      .then(userCreated => {
        user = userCreated;
        userCreated.should.be.not.empty();
        userCreated.should.be.an.Object();
        userCreated.should.have.property('id');
        userCreated.should.have.property('name');
        userCreated.should.have.property('lastname');
        userCreated.should.have.property('date_birth');
        userCreated.should.have.property('email');
        userCreated.should.have.property('profile');
      });
    });
    it('should find user created', () => {
      user = user.dataValues;
      return User.findOne({ where: { id: user.id }}).then(foundUser => {
        foundUser.should.be.an.Object();
        foundUser.should.be.not.empty();
        foundUser.should.have.property('name', user.name);
      });
    });
  });

  describe('\n--------------Validations on associations--------------\n', () => {
    var institution;
    var user;
    before(() => {
      return Promise.all([
        factory.create('institution'),
        factory.create('user'),
      ]).then(result => {
        institution = result[0];
        user = result[1];
        return user.setInstitution(institution);
      });
    });
    describe('Find user with specific institution', () => {
      it('should find user with specific associated institution', () => {
        return User.findOne({ where: { id: user.dataValues.id }}).then(user => {
          user = user.dataValues;
          user.should.be.an.Object();
          user.should.be.not.empty();
          user.should.have.property('InstitutionId', institution.dataValues.id);
        });
      });
    });
  });
});