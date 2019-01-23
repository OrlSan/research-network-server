var assert = require('assert');
const factory = require('factory-girl').factory;

const debug = require('debug')('bootstrap');
const should = require('should');

const chai = require('chai');
const db = require('../db');

before(() => {
  return db.sync()
  .then(() => {
    global.should = chai.Should();
    global.db = db;

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
      console.log('KEY FACTORY', key);
    });
    factory.models = models;
    global.factory = factory;
    const bodyParser = require('body-parser');
    const express = require('express');
    var mainRoutes = require('../routes/main');
    var usersRoutes = require('../routes/users');
    var areasRoutes = require('../routes/areas');
    var institutionsRoutes = require('../routes/institutions');
    var projectsRoutes = require('../routes/projects');
    var publicationsRoutes = require('../routes/publications');

    const app = express();
    app.use(bodyParser.json());
    app.use('/', mainRoutes);
    app.use('/users', usersRoutes);
    app.use('/areas', areasRoutes);
    app.use('/institutions', institutionsRoutes);
    app.use('/projects', projectsRoutes);
    app.use('/publications', publicationsRoutes);
    app.listen(3000, () => {
        console.log('Express server port 3000:  \x1b[36m%s\x1b[0m', 'ONLINE');
    });
  })
  .catch((err) => {
    debug("Databse not syncronized");
    debug(err);
    throw err;
  })
});

beforeEach(() => {
  /**
  * Clean environment before each test
  */
  // return db.drop()
  // .then(() => {
  //   return db.sync();
  // })
});

