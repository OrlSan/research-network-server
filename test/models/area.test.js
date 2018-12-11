describe('\n\n________________________AREA________________________', () => {
  describe('\n--------------Validations on creation--------------\n', () => {
    let area;
    it('should create valid area with required properties', () => {
      return factory.create('area')
      .then(areaCreated => {
        area = areaCreated;
        areaCreated.should.be.a('object').that.is.not.empty;
        areaCreated.should.have.property('id');
        areaCreated.should.have.property('name');
        areaCreated.should.have.property('image_url');
        areaCreated.should.have.property('description');
      });
    });
    it('should find area created', () => {
      area = area.dataValues;
      return Area.findOne({ where: { id: area.id }}).then(areaFinded => {
        areaFinded.should.be.a('object').that.is.not.empty;
        areaFinded.should.have.property('name', area.name);
      });
    });
  });
});