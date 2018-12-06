var assert = require('assert');
const should = require('should');
describe('\n\n________________________PUBLICATION________________________', () => {
  describe('\n--------------Validations on creation--------------\n', () => {
    let publication;
    it('should create valid publication with required properties', () => {
      return factory.create('publication')
      .then(publicationCreated => {
        publication = publicationCreated;
        publicationCreated.should.be.not.empty();
        publicationCreated.should.be.an.Object();
        publicationCreated.should.have.property('id');
        publicationCreated.should.have.property('title');
        publicationCreated.should.have.property('type');
        publicationCreated.should.have.property('is_public');
        publicationCreated.should.have.property('abstract');
      });
    });
    it('should find publication created', () => {
      publication = publication.dataValues;
      return Publication.findOne({ where: { id: publication.id }}).then(publicationFinded => {
        publicationFinded.should.be.an.Object();
        publicationFinded.should.be.not.empty();
        publicationFinded.should.have.property('title', publication.title);
      });
    });
  });

  describe('\n--------------Validations on associations--------------\n', () => {
    describe('\n- - - - - - Associations with areas - - - - - - \n', () => {
      var area;
      var publication;
      before(() => {
        return Promise.all([
          factory.create('area'),
          factory.create('publication'),
        ]).then(result => {
          area = result[0];
          publication = result[1];
          return publication.setArea(area);
        });
      });
      describe('Find publication with specific area', () => {
        it('should find publication with specific associated area', () => {
          return Publication.findOne({ where: { id: publication.dataValues.id }}).then(publication => {
            publication = publication.dataValues;
            publication.should.be.an.Object();
            publication.should.be.not.empty();
            publication.should.have.property('AreaId', area.dataValues.id);
          });
        });
      });
    });
    describe('\n- - - - - - Associations with members - - - - - - \n', () => {
      let users;
      let publication;
      before(() => {
        return Promise.all([
          factory.createMany('user', 3),
          factory.create('publication'),
        ]).then(result => {
          users = result[0];
          publication = result[1];
          return publication.addUsers(users);
        });
      });
      describe('Should find authors of specific publications', () => {
        it('should find authors of specific publication', () => {
          return publication.getUsers().then(usersFound => {
            usersFound.should.be.not.empty();
            usersFound.should.be.an.Array();
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
    describe('\n- - - - - - Associations with areas - - - - - - \n', () => {
      let areas;
      let publication;
      before(() => {
        return Promise.all([
          factory.createMany('area', 3),
          factory.create('publication'),
        ]).then(result => {
          areas = result[0];
          publication = result[1];
          return publication.addAreas(areas);
        });
      });
      describe('Should find areas of specific publications', () => {
        it('should find areas of specific publication', () => {
          return publication.getAreas().then(areasFound => {
            areasFound.should.be.not.empty();
            areasFound.should.be.an.Array();
            areasFound.should.have.lengthOf(3);
            let areasIDFound = [];
            areasFound.forEach(area => {
              areasIDFound.push(area.dataValues.id);
            });
            let areasIDAdded = [];
            areas.forEach(area => {
              areasIDAdded.push(area.dataValues.id);
            });
            areasIDAdded.sort().join(',').should.be.equal(areasIDFound.sort().join(','));
          });
        });
      });
    });
  });
});