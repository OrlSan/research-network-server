const request = require('supertest');

describe('\n\n________________________INSTITUTIONS_ROUTES________________________', () => {
  before(() => {
    return db.drop()
    .then(() => {
      return db.sync();
    })
  });
  describe('\n-------------- Validations on get ---------------\n', () => {
    it('should return 3 institutions with required properties', () => {
      return factory.createMany('institution', 3)
      .then(() => {
        return request('http://localhost:3000')
        .get('/institutions')
        .expect(200)
      })
      .then((response) => {
        let institutions = response.body;
        institutions.should.be.an('array');
        institutions.should.have.length(3);
        institutions.forEach(institution => {
          institution.should.have.property('id');
          institution.should.have.property('name');                    
          institution.should.have.property('faculty');
          institution.should.have.property('country');
          institution.should.have.property('email');
          institution.should.have.property('state');
          institution.should.have.property('address');

        });
      });
    });
  });
  describe('\n-------------- Validations on post ---------------\n', () => {
    it('should create an institution', () => {
      let institution = {
        name: "Universidad Nacional Autónoma de México",
        faculty: "Facultad de Ciencias",
        country: "México",
        email: "unam@unam.com",
        state: "Ciudad de México",
        address: "Coyoacan Num. 23"
      };
      return request('http://localhost:3000')
      .post('/institutions')
      .send({'institution': institution})
      .then((response) => {
        institution = response.body;
        institution.should.have.property('id');
        institution.should.have.property('name');                    
        institution.should.have.property('faculty');
        institution.should.have.property('country');
        institution.should.have.property('email');
        institution.should.have.property('state');
        institution.should.have.property('address');
        return Institution.findByPk(institution.id);
      })
      .then(foundInstitution => {
        foundInstitution.should.have.property('id');
        foundInstitution.should.have.property('name');                    
        foundInstitution.should.have.property('faculty');
        foundInstitution.should.have.property('country');
        foundInstitution.should.have.property('email');
        foundInstitution.should.have.property('state');
        foundInstitution.should.have.property('address');
      })
    });
  });
  describe('\n-------------- Validations on put ---------------\n', () => {
    it('should update an institution', () => {
      let institution = {
        name: "Instituto Politécnico Nacional",
        faculty: "Facultad de Ingeniería",
        country: "México",
        email: "ipn@ipn.com",
        state: "Ciudad de México",
        address: "Coyoacan Num. 23"
      };
      return Institution.create(institution)
      .then(createdInstitution => {
        institution = createdInstitution.dataValues;
        return request('http://localhost:3000')
        .put('/institutions/' + institution.id)
        .send({'institution' : {
          address: 'Coyoacan Num. 80'
        }})
        .expect(200)
      })
      .then(response => {
        institution = response.body;
        institution.should.have.property('id');                 
        institution.should.have.property('address', 'Coyoacan Num. 80');
        return Institution.findByPk(institution.id);
      })
      .then(foundInstitution => {
        foundInstitution.should.have.property('id', institution.id);        
        foundInstitution.should.have.property('name');                    
        foundInstitution.should.have.property('address', 'Coyoacan Num. 80');
        foundInstitution.should.have.property('faculty');                    
        foundInstitution.should.have.property('country');
      })
    });
  });
  describe('\n-------------- Validations on delete ---------------\n', () => {
    it('should delete an institution', () => {
      let institution = {
        name: "Instituto Politécnico Nacional2",
        faculty: "Facultad de Ingeniería",
        country: "México",
        email: "ipn2@ipn2.com",
        state: "Ciudad de México",
        address: "Coyoacan Num. 23"
      };
      return Institution.create(institution)
      .then(createdInstitution => {
        institution = createdInstitution.dataValues;
        return request('http://localhost:3000')
        .delete('/institutions/' + institution.id)
        .expect(204)
      })
      .then(response => {
        return Institution.findByPk(institution.id);
      })
      .then(foundInstitution => {
        should.not.exists(foundInstitution);
      })
    });
  });

 

});