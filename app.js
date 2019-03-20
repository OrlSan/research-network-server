const debug = require('debug')('bootstrap');
const db = require('./db');

db.sync()
  .then(() => {

    /** Session **/
    const cors = require("cors");
    const passport = require('passport');
    const BearerStrategy = require('passport-http-bearer').Strategy;
    global.passport = passport;

    /** Testing **/
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

    /** Hashing **/
    const bcrypt = require('bcryptjs');
    global.bcrypt = bcrypt;

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
      password: 'luisluis',
      profile: 'STUDENT'
    })
      .then(() => {
        console.log('Student created');
      });


    passport.use(new BearerStrategy(
      function (token, done) {
        User.findOne({ where: { token: token } })
          .then(user => {
            return done(null, user.dataValues);
          })
          .catch(err => {
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
