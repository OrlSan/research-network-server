const faker = require('faker');

module.exports = factory => {
    return factory.define('institution', Institution, {
        name: factory.seq('Institution.name', (n) => faker.name.findName()),
        faculty: factory.seq('Institution.faculty', (n) => faker.name.findName()),
        country: factory.seq('Institution.country', (n) => faker.address.country()),
        state: factory.seq('Institution.state', (n) =>  faker.address.state()),
        email: factory.seq('Institution.email', (n) =>  `user${n}@ymail.com`),
        address: factory.seq('Institution.address', (n) =>  faker.address.streetAddress()),        
    });
};
