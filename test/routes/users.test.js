const request = require('supertest');

describe('\n\n________________________USERS_ROUTES________________________', () => {
  before(() => {
    return db.drop()
    .then(() => {
      return db.sync();
    })
  });
  describe('\n-------------- Validations on get ---------------\n', () => {
    it('should return 3 users with required properties', () => {
      return factory.createMany('user', 3)
      .then(() => {
        return request('http://localhost:3000')
        .get('/users')
        .expect(200)
      })
      .then((response) => {
        let users = response.body;
        users.should.be.an('array');
        users.should.have.length(3);
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
});