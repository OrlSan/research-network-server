// Bootstrap ORM and define relationships
const Sequelize = require('sequelize');
const UserModel = require('./models/User');
const InstitutionModel = require('./models/Institution');
const PublicationModel = require('./models/Publication');
const AreaModel = require('./models/Area');
const ProjectModel = require('./models/Project');
const debug = require('debug')('db');
const path = require('path');
const requireTree = require('require-tree');
const DataTypes = Sequelize.DataTypes;

// Connection to bd, user, password
const sequelize = new Sequelize('research_network', 'kim', 'kimkim', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    debug('Connection has been established successfully.');
  })
  .catch(err => {
    debug('Unable to connect to the database:', err);
  });

module.exports = {
  sync() {
    const folder = path.join(process.cwd(), 'models');
    const definitions = requireTree(folder);
    debug(definitions);
    global.models = {};
    Object.keys(definitions).forEach(key => {
      const dbModel = definitions[key](sequelize, DataTypes);
      global[key] = dbModel;
      models[key] = dbModel;
    });
    debug(sequelize.models);
    Object.keys(sequelize.models).forEach(key => {
      debug(sequelize.models[key]);
      if(sequelize.models[key].associate) sequelize.models[key].associate(sequelize.models);
    });
    debug(models);
    return sequelize.sync({ force: true })
    .catch(err => {
      debug("Unable to sync sequelize");
      throw err;
    });
  },
  drop() {
    debug('drop data base');
    return sequelize.drop();
  }
}