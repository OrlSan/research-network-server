var assert = require('assert');
const should = require('should');
describe('\n\n________________________USER________________________', () => {
  describe('\n--------------Validations on creation---------------\n', () => {
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
    describe('\n- - - - - - Associations with institutions - - - - - - \n', () => {
      let institution;
      let user;
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
          return User.findOne({ where: { id: user.dataValues.id }}).then(foundUser => {
            foundUser.should.be.an.Object();
            foundUser.should.be.not.empty();
            foundUser.should.have.property('InstitutionId', institution.dataValues.id);
          });
        });
      });
    });
    describe('\n- - - - - - Associations with publications - - - - - - \n', () =>{
      let publications;
      let user;
      before(() => {
        return Promise.all([
          factory.createMany('publication', 3),
          factory.create('user'),
        ]).then(result => {
          publications = result[0];
          user = result[1];
          return user.addPublications(publications);
        });
      });
      describe('Find publications of specific user', () => {
        it('should find publications of specific user', () => {
          return user.getPublications().then(publications => {
            publications.should.be.not.empty();
            publications.should.be.an.Array();
            publications.should.have.lengthOf(3)
          });
        });
      });
    });
  });
});