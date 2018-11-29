// Bootstrap ORM and define relationships
const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const InstitutionModel = require('./models/institution');
const PublicationModel = require('./models/publication');
// const AreaModel = require('./models/area')
// const ProjectModel = require('./models/project')



// Connection to bd, user, password
const sequelize = new Sequelize('research_network', 'kim', 'kimkim', {
  host: 'localhost',
  dialect: 'mysql',
});

// Models
const User = UserModel(sequelize, Sequelize);
const Institution = InstitutionModel(sequelize, Sequelize);
const Publication = PublicationModel(sequelize, Sequelize);

// const Area = AreaModel(sequelize, Sequelize)
// const Project = ProjectModel(sequelize, Sequelize)

// Associations 
// One user can have an institution
User.belongsTo(Institution, {foreignKey: 'id_institution'});
Institution.hasMany(User, {as: 'Members'});
// One user can have multiple publications and a publication can have multiple users
User.belongsToMany(Publication, {through: 'users_publications'});
Publication.belongsToMany(User, {through: 'users_publications'});





// Force: true will drop the table if it already exists
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
  });

module.exports = {
  User
}