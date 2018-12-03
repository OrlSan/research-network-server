const faker = require('faker');

module.exports = factory => {
    return factory.define('area', Area, {
        name: factory.seq('Area.name', (n) => faker.name.findName()),
        image_url: factory.seq('Area.image_url', (n) => faker.image.imageUrl())
    });
};
