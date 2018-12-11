var should = require('should');
describe('\n\n______________________PROJECT________________', () => {
  describe('\n--------------Validations on creation------\n', () => {
    let project;
    it('should create valid project with required properties', () => {
      return factory.create('project')
      .then(projectCreated => {
        project = projectCreated;
        projectCreated.should.be.a('object').that.is.not.empty;    
        projectCreated.should.have.property('id');
        projectCreated.should.have.property('name');
        projectCreated.should.have.property('description');
        projectCreated.should.have.property('status');
      });
    });
    it('should find project created', () => {
      project = project.dataValues;
      return Project.findOne({ where: { id: project.id }}).then(projectFinded => {
        projectFinded.should.be.a('object').that.is.not.empty;    
        projectFinded.should.have.property('name', project.name);
      });
    });
  });

  describe('\n--------------Validations on associations--------\n', () => {
    describe('\n- - - - - - Associations with responsables - - - - - - \n', () => {
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
            project.should.be.a('object').that.is.not.empty;
            project.should.have.property('user_id', user.dataValues.id);
          });
        });
      });
    });
    describe('\n- - - - - - Associations with members - - - - - - \n', () => {
      let users;
      let project;
      before(() => {
        return Promise.all([
          factory.createMany('user', 3),
          factory.create('project'),
        ]).then(result => {
          users = result[0];
          project = result[1];
          return project.addUsers(users);
        });
      });
      describe('Should find members of specific project', () => {
        it('should find members of specific project', () => {
          return project.getUsers().then(usersFound => {
            usersFound.should.be.an('array').that.is.not.empty;
            usersFound.should.have.lengthOf(3);
            let usersIDFound = [];
            usersFound.forEach(user => {
              usersIDFound.push(user.dataValues.id);
            });
            let usersIDAdded = [];
            users.forEach(user => {
              usersIDAdded.push(user.dataValues.id);
            });
            usersIDAdded.sort().join(',').should.be.equal(usersIDFound.sort().join(','));
          });
        });
      });
    });

  });
});

