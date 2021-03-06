const request = require('supertest');

describe('\n\n________________________USERS_ROUTES________________________', () => {
  let userLogged;
  before(() => {
    return db.drop()
    .then(() => {
      return db.sync()
      .then(() => {
        User.create({
          name: 'Kimberly',
          lastname: 'BF',
          date_birth: '2019-02-25',
          email: 'kim@kim.com',
          password: 'kimkim',
          profile: 'ADMIN',
          token: 'asadasadasdasd'
        })
        .then((user) => {
          console.log('Admin created');
          userLogged = user.dataValues;
        })
      })  
      ;
    })
  });
  describe('\n-------------- Validations on get ---------------\n', () => {
    it('should return 3 users with required properties', () => {
      return factory.createMany('user', 3)
      .then(() => {
        return request('http://localhost:3000')
        .get('/users')
        .set('token', userLogged.token)
        .expect(200)
      })
      .then((response) => {
        let users = response.body;
        users.should.be.an('array');
        users.forEach(user => {
          user.should.have.property('id');
          user.should.have.property('name');                    
          user.should.have.property('lastname');
          user.should.have.property('date_birth');
          user.should.have.property('email');
          user.should.have.property('profile');
        });
      });
    });
  });
  describe('\n-------------- Validations on post ---------------\n', () => {
    it('should create an user without institution', () => {
      let user = {
        name: 'Kimberly',
        lastname: 'Bwerwe werwer',
        date_birth: '2018-12-12',
        email: 'kima@asd.com',
        password: '123123',
        profile: 'ADMIN'
      };
      return request('http://localhost:3000')
      .post('/users')
      .send({'user': user})
      .expect(201)
      .then((response) => {
        user = response.body;
        user.should.have.property('id');
        user.should.have.property('name');
        user.should.have.property('lastname');
        user.should.have.property('date_birth');
        user.should.have.property('email');
        user.should.have.property('profile');
        user.should.not.have.property('institution_id');
        return User.findByPk(user.id);
      })
      .then((foundUser => {
        foundUser.should.have.property('id', user.id);
        foundUser.should.have.property('name');
        foundUser.should.have.property('lastname');
        foundUser.should.have.property('email');
        foundUser.should.have.property('profile');
      }));
    });
    it('should create an user with institution', () => {
      return factory.create('institution')
      .then(institution => {
        institution_id = institution.id; 
        let user = {
          name: 'Kimberly',
          lastname: 'Bwerwe werwer',
          date_birth: '2018-12-12',
          email: 'kimda@asd.com',
          password: '123123',
          profile: 'ADMIN',
          institution_id : institution_id
        };
        return request("http://localhost:3000")
        .post('/users')
        .send({'user': user})
        .expect(201)
      })
      .then((response) => {
        user = response.body;
        user.should.have.property('id');
        user.should.have.property('name');
        user.should.have.property('lastname');
        user.should.have.property('date_birth');
        user.should.have.property('email');
        user.should.have.property('profile');
        user.should.have.property('institution_id', institution_id);
        return User.findByPk(user.id);
      })
      .then((foundUser => {
        foundUser.should.have.property('id', user.id);
        foundUser.should.have.property('name');
        foundUser.should.have.property('lastname');
        foundUser.should.have.property('email');
        foundUser.should.have.property('profile');
        foundUser.should.have.property('institution_id', institution_id);
      }));
    });
  });
  describe('\n-------------- Validations on put ---------------\n', () => {
    it('should update name user', () => {
      let user = {
        name: 'Kimberly',
        lastname: 'Aqweooe weq',
        date_birth: '2018-12-12',
        email: 'kima@aso.com',
        password: '123123',
        profile: 'ADMIN'
      };
      User.create(user)
      .then(userCreated => {
        user = userCreated.dataValues;
        return request('http://localhost:3000')
        .put('/users/' + user.id)
        .send({'user' : {
          name: 'NewName'
        }})
        .expect(200)
      })
      .then((response) => {
        user = response.body;
        user.should.have.property('id');
        user.should.have.property('name', 'NewName');
        return User.findByPk(user.id);
      })
      .then((foundUser => {
        foundUser.should.have.property('id', user.id);
        foundUser.should.have.property('name', 'NewName');
      }));
    });
    it('should update institution of an user', () => {
      return factory.create('institution')
      .then(institution => {
        institution_id = institution.id; 
        return factory.create('user');
      })
      .then(user =>{
        user = user.dataValues;
        return request('http://localhost:3000')
        .put('/users/' + user.id)
        .send({'user' :{
          name: 'Kimy',
          institution_id: institution_id
        }})
        .expect(200)
      })
      .then((response) => {
        user = response.body;
        user.should.have.property('id');
        user.should.have.property('name');
        user.should.have.property('lastname');
        user.should.have.property('date_birth');
        user.should.have.property('email');
        user.should.have.property('profile');
        user.should.have.property('institution_id', institution_id);
        return User.findByPk(user.id);
      })
      .then((foundUser => {
        foundUser.should.have.property('id', user.id);
        foundUser.should.have.property('name');
        foundUser.should.have.property('lastname');
        foundUser.should.have.property('email');
        foundUser.should.have.property('profile');
        foundUser.should.have.property('institution_id', institution_id);
      }));
    });
  });
  describe('\n-------------- Validations on delete ---------------\n', () => {
    it('should delete an user', () => {
      let user = {
        name: 'Luis',
        lastname: 'Navarro',
        date_birth: '2018-12-12',
        email: 'luis@asd.com',
        password: '123123',
        profile: 'ADMIN'
      };
      return User.create(user)
      .then(createdUser => {
        user = createdUser.dataValues;
        return request('http://localhost:3000')
        .delete('/users/' + user.id)
        .expect(204)
      })
      .then(response => {
        return User.findByPk(user.id);
      })
      .then(foundUser => {
        should.not.exists(foundUser);
      })
    });
  });
});
