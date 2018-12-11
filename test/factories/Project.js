const faker = require('faker');

module.exports = factory => {
	return factory.define('project', Project, {
		name: factory.seq('Project.name', (n) => faker.name.findName()),
		description: factory.seq('Project.description', (n) => faker.lorem.sentence()),
		status: factory.seq('Project.status', (n) => 'FINISHED'),
		UserId: factory.assoc('user', 'id')
	});
};
