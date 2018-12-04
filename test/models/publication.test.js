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
});