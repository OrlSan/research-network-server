const debug = require('debug')('bootstrap');
const db = require('./db');

db.sync()
	.then(() => {
		const cors = require("cors");
		const session    = require('express-session');
		const passport = require('passport');
		const LocalStrategy = require('passport-local').Strategy;
		const BearerStrategy = require('passport-http-bearer').Strategy;

		var cookieParser = require('cookie-parser');

		global.passport = passport;		

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
		var authRoutes = require('./routes/auth');

		const app = express();
		app.use(cors());
		app.use(bodyParser.json());
		app.use('/', mainRoutes);
		app.use('/users', userRoutes);
		app.use('/institutions', institutionRoutes);
		app.use('/areas', areasRoutes);
		app.use('/publications', publicationsRoutes);
		app.use('/projects', projectsRoutes);
		
		User.create({
			name: 'Kimberly',
			lastname: 'BF',
			date_birth: '2019-02-25',
			email: 'kim@kim.com',
			password: 'kimkim',
			profile: 'ADMIN'
		})
		.then(() => {
			console.log('Admin created');
		});

		User.create({
			name: 'Luis',
			lastname: 'CN',
			date_birth: '2019-02-25',
			email: 'luis@luis.com',
			password: 'luisluis',
			profile: 'RESEARCHER'
		})
		.then(() => {
			console.log('Researcher created');
		});

		User.create({
			name: 'Fer',
			lastname: 'BF',
			date_birth: '2019-02-25',
			email: 'fer@fer.com',
			password: 'ferfer',
			profile: 'STUDENT'
		})
		.then(() => {
			console.log('Student created');
		});

		// factory.createMany('user', 3)
		// .then(users => {
		// 	console.log('Created 3 users\n');
		// });
		// factory.createMany('area', 3)
		// .then(areas => {
		// 	console.log('Created 3 areas\n');
		// });

		// passport config
		app.use(cookieParser('keyboard cat'));
 		app.use(session({
			 secret: 'keyboard cat',
			 saveUninitialized: true,
			 resave: false,
			 cookie: {
				 httpOnly: true
			}})); // session secret
		app.use(passport.initialize());
		app.use(passport.session());

		passport.serializeUser(function(user, done) {
			done(null, user);
		});

		// used to deserialize the user
		passport.deserializeUser(function(id, done) {
			done(null, user);
		});

		passport.use(new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			function(email, password, done) {
				User.findOne({ where: { email: email}})
				.then(user => {
					return done(null, user.dataValues);
				})
				.catch(err => {
					console.log('ERR', err);
					return done(err);
				});
			}
		));

		passport.use(new BearerStrategy(
			function(token, done) {
				console.log('TOKEN', token);
					//@TODO findOne by token
				User.findOne({ where: { token: token }})
				.then(user => {
					return done(null, user.dataValues);
				})
				.catch(err => {
					console.log('ERR', err);
					return done(err);
				});
				return done(null, null);
			}
		));

		app.use('/login', authRoutes);

		// catch 404 and forward to error handler
		app.use((req, res, next) => {
			res.locals.user = req.user || null;
			res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
