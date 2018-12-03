const faker = require('faker');

module.exports = factory => {
    return factory.define('publication', Publication, {
        title: factory.seq('Publication.title', (n) => faker.name.findName()),
        type: factory.seq('Publication.type', (n) => 'paper'),
        is_public: factory.seq('Publication.is_public', (n) => 1),
        abstract: factory.seq('Publication.abstract', (n) =>  faker.lorem.paragraph()),
    });
};
