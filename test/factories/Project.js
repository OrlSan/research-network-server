const faker = require('faker');

module.exports = factory => {
    return factory.define('project', Project, {
        name: factory.seq('Project.name', (n) => faker.name.findName()),
        description: factory.seq('Project.description', (n) => faker.lorem.paragraph()),
        status: factory.seq('Project.status', (n) => 'FINISHED'),
    });
};
