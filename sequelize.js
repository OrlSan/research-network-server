// Bootstrap ORM and define relationships
const Sequelize = require('sequelize')
const UserModel = require('./models/user')

// Connection to bd, user, password
const sequelize = new Sequelize('users', 'kim', 'kimkim', {
  host: 'localhost',
  dialect: 'mysql',
})

const User = UserModel(sequelize, Sequelize)

// Force: true will drop the table if it already exists
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
  });

module.exports = {
  User
}