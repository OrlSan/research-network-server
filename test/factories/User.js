const faker = require('faker');

module.exports = factory => {
	return factory.define('user', User, {
		name: factory.seq('User.name', (n) => faker.name.findName()),
		lastname: factory.seq('User.lastname', (n) => faker.name.findName()),
		date_birth: factory.seq('User.date_birth', (n) => faker.date.recent()),
		email: factory.seq('User.email', (n) => `user${n}@ymail.com`),
		password: factory.seq('User.password', (n) => faker.lorem.word()),
		profile: 'ADMIN',
		institution_id: factory.assoc('institution', 'id')
	});
};
