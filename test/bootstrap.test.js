var assert = require('assert');
const factory = require('factory-girl').factory;


const debug = require('debug')('bootstrap');
const should = require('should');


/**
* Using Sequelize
**/
const db = require('../sequelize');

before(() => {
  return db.sync()
  .then(() => {
    global.should = should;
    /**
    * Using Sequelize
    **/

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
    /**
    * Using Express
    **/
    const bodyParser = require('body-parser');
    const express = require('express');
    var mainRoutes = require('../routes/main');
    var userRoutes = require('../routes/users');

    const app = express();
    app.use(bodyParser.json());//Just for some express versions
    app.use('/', mainRoutes);
    app.use('/users', userRoutes);
    app.listen(3000, ()=>{
        console.log('Express server port 3000:  \x1b[36m%s\x1b[0m', 'ONLINE');
    });
  })
  .catch((err) => {
    debug("Databse not syncronized");
    debug(err);
    throw err;
  })
});

describe('UserTests', () => {
 
    beforeEach(() => {
        console.log('BEFORE voy a crear');
        return factory.createMany('user', 10).
        then(users => {
          console.log("** Created 10 users");
        })
        .catch(err => {
          console.log("Error", err);
        });
    });
    describe('Array', function() {
        describe('#indexOf()', function() {
          it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
          });
        });
    });
    describe('Find all users', () => {
      it('should find all users', () => {
        return User.findAll({}).then(users => {
          users.should.be.an.Object();
          users.should.be.not.empty();
          users.forEach(result => {
            let user = result.toJSON();
            user.should.have.keys('name', 'lastname');
          });
        });
      });
    });
  });


afterEach(() => {
  /**
  * Clean environment before each test
  */
  return db.drop()
  .then(() => {
    return db.sync();
  })
});
