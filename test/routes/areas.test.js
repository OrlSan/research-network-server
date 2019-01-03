const request = require('supertest');

describe('\n\n________________________AREAS_ROUTES________________________', () => {
  before(() => {
    return db.drop()
    .then(() => {
      return db.sync();
    })
  });
  describe('\n-------------- Validations on get ---------------\n', () => {
    it('should return 3 areas with required properties', () => {
      return factory.createMany('area', 3)
      .then(() => {
        return request('http://localhost:3000')
        .get('/areas')
        .expect(200)
      })
      .then((response) => {
        let areas = response.body;
        areas.should.be.an('array');
        areas.should.have.length(3);
        areas.forEach(area => {
          area.should.have.property('id');
          area.should.have.property('name');                    
          area.should.have.property('description');
        });
      });
    });
  });
  describe('\n-------------- Validations on post ---------------\n', () => {
    it('should create an area', () => {
      let area = {
        name: "Artificial Intelligence",
        description: "All related to AI",
        image_url: "http://image.png"
      };
      return request('http://localhost:3000')
      .post('/areas')
      .send({'area': area})
      .then((response) => {
        area = response.body;
        area.should.have.property('id');
        area.should.have.property('name');                    
        area.should.have.property('description');
        area.should.have.property('image_url');
        return Area.findByPk(area.id);
      })
      .then(foundArea => {
        foundArea.should.have.property('id', area.id);
        foundArea.should.have.property('name', area.name);                    
        foundArea.should.have.property('description', area.description);
        foundArea.should.have.property('image_url', area.image_url);
      })
    });
  });
  describe('\n-------------- Validations on put ---------------\n', () => {
    it('should update an area', () => {
      let area = {
        name: "Machine learning",
        description: "All related to ML",
        image_url: "http://imageM.png"
      };
      return Area.create(area)
      .then(areaCreated => {
        area = areaCreated.dataValues;
        return request('http://localhost:3000')
        .put('/areas/' + area.id)
        .send({'area' : {
          description: 'Basic stuff'
        }})
        .expect(200)
      })
      .then(response => {
        area = response.body;
        area.should.have.property('id', area.id);
        area.should.have.property('name', area.name);                    
        area.should.have.property('description', 'Basic stuff');
        return Area.findByPk(area.id);
      })
      .then(foundArea => {
        foundArea.should.have.property('id', area.id);        
        foundArea.should.have.property('name', area.name);                    
        foundArea.should.have.property('description', 'Basic stuff');
      })
    });
  });

 

});