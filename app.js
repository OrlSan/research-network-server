const debug = require('debug')('bootstrap');
const db = require('./db');

db.sync()
	.then(() => {

		const passport = require('passport');
		const LocalStrategy = require('passport-local').Strategy;
		passport.use(new LocalStrategy(
			function(username, password, done) {
				User.findOne({ username: username }, function (err, user) {
					if (err) { return done(err); }
					if (!user) { return done(null, false); }
					if (!user.verifyPassword(password)) { return done(null, false); }
					return done(null, user);
				});
			}
		));

		const chai = require('chai');
		global.should = chai.Should();
		const FactoryGirl = require('factory-girl');
		const path = require('path');
		const requireTree = require('require-tree');
		const factory = FactoryGirl.factory;
		const adapter = new FactoryGirl.SequelizeAdapter();
		const folder = path.join(process.cwd(), 'test', 'factories');
		const factories = requireTree(folder);
		factory.setAdapter(adapter);
		Object.keys(factories).forEach(key => {
			factories[key](factory);
		});
		factory.models = models;
		global.factory = factory;
		const bodyParser = require('body-parser');
		const express = require('express');
		var mainRoutes = require('./routes/main');
		var userRoutes = require('./routes/users');
		var institutionRoutes = require('./routes/institutions');
		var areasRoutes = require('./routes/areas');
		var publicationsRoutes = require('./routes/publications');
		var projectsRoutes = require('./routes/projects');

		const app = express();
		app.use(bodyParser.json());//Just for some express versions
		app.use('/', mainRoutes);
		app.use('/users', userRoutes);
		app.use('/institutions', institutionRoutes);
		app.use('/areas', areasRoutes);
		app.use('/publications', publicationsRoutes);
		app.use('/projects', projectsRoutes);


		factory.createMany('user', 10)
		.then(users => {
			console.log('Created 10 users\n');
		});
		factory.createMany('area', 10)
		.then(areas => {
			console.log('Created 10 areas\n');
		});

		// catch 404 and forward to error handler
		app.use((req, res, next) => {
			var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
			console.log('URL', fullUrl);
			var err = new Error('Not Found');
			err.status = 404;
			res.status(404).json({
				msg: 'NOT FOUND'
			});
		});
		app.listen(3000, () => {
			console.log('Express server port 3000:  \x1b[36m%s\x1b[0m', 'ONLINE');
		});
	})
	.catch((err) => {
		debug("Database not syncronized");
		debug(err);
		throw err;
	});
