var assert = require('assert');
const should = require('should');
describe('\n\n______________________PROJECT________________', () => {
  describe('\n--------------Validations on creation------\n', () => {
    let project;
    it('should create valid project with required properties', () => {
      return factory.create('project')
      .then(projectCreated => {
        project = projectCreated;
        projectCreated.should.be.not.empty();
        projectCreated.should.be.an.Object();
        projectCreated.should.have.property('id');
        projectCreated.should.have.property('name');
        projectCreated.should.have.property('description');
        projectCreated.should.have.property('status');
      });
    });
    it('should find project created', () => {
      project = project.dataValues;
      return Project.findOne({ where: { id: project.id }}).then(projectFinded => {
        projectFinded.should.be.an.Object();
        projectFinded.should.be.not.empty();
        projectFinded.should.have.property('name', project.name);
      });
    });
  });

  describe('\n--------------Validations on associations--------\n', () => {
    var user;
    var project;
    before(() => {
      return Promise.all([
        factory.create('user'),
        factory.create('project'),
      ]).then(result => {
        user = result[0];
        project = result[1];
        return project.setUser(user);
      });
    });
    describe('Find project with specific user/responsable', () => {
      it('should find project with specific associated user', () => {
        return Project.findOne({ where: { id: project.dataValues.id }}).then(project => {
          project = project.dataValues;
          project.should.be.an.Object();
          project.should.be.not.empty();
          project.should.have.property('UserId', user.dataValues.id);
        });
      });
    });
  });
});