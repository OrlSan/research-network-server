describe('\n\n________________________USER________________________', () => {
  describe('\n--------------Validations on creation---------------\n', () => {
    let user;
    it('should create valid user with required properties', () => {
      return factory.create('user')
      .then(userCreated => {
        user = userCreated;
        userCreated.should.be.ok;
        userCreated.should.be.a('object');
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
        foundUser.should.be.ok;
        foundUser.should.be.a('object');
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
            foundUser.should.be.ok;
            foundUser.should.be.a('object');
            foundUser.should.have.property('institution_id', institution.dataValues.id);
          });
        });
      });
    });
    describe('\n- - - - - - Associations with publications - - - - - - \n', () => {
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
            publications.should.be.ok;
            publications.should.be.an('array');
            publications.should.have.lengthOf(3)
          });
        });
      });
    });
    describe('\n - - Associations with projects - - \n', () => {
      let projects;
      let user;
      before(() => {
        return Promise.all([
          factory.createMany('project', 3),
          factory.create('user', {name:'kim'}),
        ]).then(result => {
          projects = result[0];
          user = result[1];
          return user.addProjects(projects);
        });
      });
      describe('Find projects where user is member', () => {
        it('should find projects where user is member', () => {
          return user.getProjects().then(projectsFound => {
            projectsFound.should.be.an('array').that.is.not.empty;
            projectsFound.should.have.lengthOf(3);
            let projectsIDFound = [];
            projectsFound.forEach(project => {
              projectsIDFound.push(project.dataValues.id);
            });
            let projectsIDAdded = [];
            projects.forEach(project => {
              projectsIDAdded.push(project.dataValues.id);
            });
            projectsIDAdded.sort().join(',').should.be.equal(projectsIDFound.sort().join(','));
          });
        });
      });
    });
  });
});