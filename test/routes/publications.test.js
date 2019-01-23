const request = require('supertest');

describe('\n\n________________________PUBLICATIONS_ROUTES________________________', () => {
  before(() => {
    return db.drop()
    .then(() => {
      return db.sync();
    })
  });
  describe('\n-------------- Validations on get ---------------\n', () => {
    it('should return 3 publications with required properties', () => {
      return factory.createMany('publication', 3)
      .then(() => {
        return request('http://localhost:3000')
        .get('/publications')
        .expect(200);
      })
      .then((response) => {
        let publications = response.body;
        publications.should.be.an('array');
        publications.should.have.length(3);
        publications.forEach(publication => {
          publication.should.have.property('id');
          publication.should.have.property('title');                    
          publication.should.have.property('type');
          publication.should.have.property('is_public');
        });
      });
    });
  });
  describe('\n-------------- Validations on post ---------------\n', () => {
    it('should create a publication with 2 areas and 2 areas', () => {
      return factory.createMany('user', 2)
      .then(users => {
        authors_id = [];
        authors_id.push(users[0].dataValues.id);
        authors_id.push(users[1].dataValues.id);
        return factory.createMany('area', 3);
      })
      .then(areas => {
        main_area_id = areas[0].dataValues.id;
        rel_areas_id = [];
        rel_areas_id.push(areas[1].dataValues.id);
        rel_areas_id.push(areas[2].dataValues.id);
        let publication = {
          title: 'Thesis F',
          type: 'thesis',
          is_public: 1,
          abstract: 'abstract thesis F',
          area_id: main_area_id,
          related_areas: rel_areas_id,
          authors: authors_id
        };
        return request('http://localhost:3000')
        .post('/publications')
        .send({'publication': publication})
        .expect(201);
      })
      .then(response => {
        let publication = response.body;
        publication.should.have.property('id');
        publication.should.have.property('title');                    
        publication.should.have.property('type');
        publication.should.have.property('abstract');
        publication.should.have.property('area_id');
        return Publication.findByPk(publication.id);
      })
      .then(foundPublication => {
        foundPublication.should.have.property('id');
        foundPublication.should.have.property('title');                    
        foundPublication.should.have.property('type');
        foundPublication.should.have.property('abstract');
        foundPublication.should.have.property('area_id');
        publication = foundPublication;
        return foundPublication.getUsers();
      })
      .then(foundAuthors => { 
        foundAuthors.should.be.an('array');
        foundAuthors.should.have.length(2);
        return publication.getAreas();
      })
      .then(foundAreas => {
        foundAreas.should.be.an('array');
        foundAreas.should.have.length(2);
      })
    });
  }); 
});