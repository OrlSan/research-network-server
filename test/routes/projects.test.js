const request = require('supertest');

describe('\n\n________________________PROJECT_ROUTES________________________', () => {
  before(() => {
    return db.drop()
    .then(() => {
      return db.sync();
    })
  });
  describe('\n-------------- Validations on get ---------------\n', () => {
    it('should return 3 projects with required properties', () => {
      return factory.createMany('project', 3)
      .then(() => {
        return request('http://localhost:3000')
        .get('/projects')
        .expect(200)
      })
      .then((response) => {
        let projects = response.body;
        projects.should.be.an('array');
        projects.should.have.length(3);
        projects.forEach(project => {
          project.should.have.property('id');
          project.should.have.property('name');                    
          project.should.have.property('description');
          project.should.have.property('status');
          project.should.have.property('user_id');
        });
      });
    });
  });
  describe('\n-------------- Validations on post ---------------\n', () => {
    it('should create a project without members', () => {
      return factory.create('user')
      .then(user => {
        let project = {
          name: "Project X",
          description: "X description",
          status: "active",
          user_id: user.id
        };
        return request("http://localhost:3000")
        .post('/projects')
        .send({'project': project})
        .expect(201)
      })
      .then(response => {
        let project = response.body;
        project.should.have.property('id');
        project.should.have.property('name');                    
        project.should.have.property('description');
        project.should.have.property('status');
        project.should.have.property('user_id');
        return Project.findByPk(project.id)
      })
      .then(foundProject => {
        foundProject.should.have.property('id');
        foundProject.should.have.property('name');                    
        foundProject.should.have.property('description');
        foundProject.should.have.property('status');
        foundProject.should.have.property('user_id');
        return foundProject.getUsers();
      })
      .then(usersFound => {
        usersFound.should.be.an('array');
        usersFound.should.have.length(0);
      })
    });
    it('should create a project with 2 members', () => {
      return factory.createMany('user', 3)
      .then(users => {
        owner_id = users[0].dataValues.id;
        members_id = [];
        members_id.push(users[1].dataValues.id);
        members_id.push(users[2].dataValues.id);
        let project = {
          name: "Project Z",
          description: "Z description",
          status: "active",
          user_id: owner_id,
          members: members_id
        };
        return request("http://localhost:3000")
        .post('/projects')
        .send({'project': project})
        .expect(201)
      })
      .then(response => {
        let project = response.body;
        project.should.have.property('id');
        project.should.have.property('name');                    
        project.should.have.property('description');
        project.should.have.property('status');
        project.should.have.property('user_id');
        return Project.findByPk(project.id)
      })
      .then(foundProject => {
        foundProject.should.have.property('id');
        foundProject.should.have.property('name');                    
        foundProject.should.have.property('description');
        foundProject.should.have.property('status');
        foundProject.should.have.property('user_id');
        return foundProject.getUsers();
      })
      .then(usersFound => {
        usersFound.should.be.an('array');
        usersFound.should.have.length(2);
      })
    });
  });
  describe('\n-------------- Validations on delete ---------------\n', () => {
    it('should delete a project', () => {
      return factory.create('project')
      .then(createdProject => {
        project = createdProject.dataValues;
        return request('http://localhost:3000')
        .delete('/projects/' + project.id)
        .expect(204)
      })
      .then(response => {
        return Project.findByPk(project.id);
      })
      .then(foundProject => {
        should.not.exists(foundProject);
      })
    });
  });
});
