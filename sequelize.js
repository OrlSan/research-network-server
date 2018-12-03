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

// Models
const User = UserModel(sequelize, Sequelize);
const Institution = InstitutionModel(sequelize, Sequelize);
const Publication = PublicationModel(sequelize, Sequelize);
const Area = AreaModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);


// Associations user=author
//One user can have an institution
// User.belongsTo(Institution);
// Institution.hasMany(User, {as: 'Members'});
// // One user can have multiple publications and a publication can have multiple users
// User.belongsToMany(Publication, {through: 'publications_authors'});
// Publication.belongsToMany(User, {through: 'publications_authors'});
// // One publication can have one area
// Publication.belongsTo(Area);
// Area.hasMany(Publication, {as: 'Publications'});
// // One publication apart from its main area is related to other areas and viceversa
// Publication.belongsToMany(Area, {through: 'publications_areas'});
// Area.belongsToMany(Publication, {through: 'publications_areas'});
// // One project belongs to an user(the owner) and one user can have multiple projects
// Project.belongsTo(User);
// User.hasMany(Project, {as: 'Projects'});
// // One project can have many members
// Project.belongsToMany(User, {through: 'projects_members'});
// User.belongsToMany(Project, {through: 'projects_members'});

sequelize
  .authenticate()
  .then(() => {
    debug('Connection has been established successfully.');
  })
  .catch(err => {
    debug('Unable to connect to the database:', err);
  });

// Force: true will drop the table if it already exists
// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`);

//     //Creating 10 random users
//     factory.define('user', User, {
//       name: factory.seq('User.name', (n) => faker.name.findName()),
//       lastname: factory.seq('User.lastname', (n) => faker.name.findName()),
//       date_birth: factory.seq('User.date_birth', (n) => faker.date.recent()),
//       email: factory.seq('User.email', (n) => `user${n}@ymail.com`),
//       profile: 'ADMIN'
//     });
//     //Factory createMany persists data in db
//     // factory.createMany('user', 10).
//     // then(users => {
//     //   console.log("** Created 10 users");
//     // })
//     // .catch(err => {
//     //   console.log("Error", err);
//     // });
// });


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
      console.log('KEY', key);
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
  },
  // User,
  // Institution,
  // Publication,
  // Area,
  // Project
}