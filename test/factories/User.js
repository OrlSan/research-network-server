const faker = require('faker');

module.exports = factory => {
	return factory.define('user', User, {
		name: factory.seq('User.name', (n) => faker.name.findName()),
		lastname: factory.seq('User.lastname', (n) => faker.name.findName()),
		date_birth: factory.seq('User.date_birth', (n) => faker.date.recent()),
		email: factory.seq('User.email', (n) => `user${n}@ymail.com`),
		profile: 'ADMIN',
		InstitutionId: factory.assoc('institution', 'id')
	});
};
