module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        lastname: {
            type: type.STRING,
            allowNull: false,
        },
        date_birth: {
            type: type.DATE,
        },
        email: {
            type: type.STRING,
            allowNull: false,
            validate: { 
                isEmail: true
            },
            unique: true
        },
        profile: {
            type: type.STRING,
            allowNull: false,
        }
    });

    // // One user can have an institution
    // User.associate = models => {
    //     return models.User.belongsTo(models.Institution);
    // };
    // // One user can have multiple publications and a publication can have multiple users
    // User.associate = models => {
    //     return models.User.belongsToMany(models.Publication, {through: 'publications_authors'});
    // };
    // // One user can be responsable of many projects
    // User.associate = models => {
    //     return models.User.hasMany(models.Project, {as: 'Projects'});
    // };
    // // One user can be member of many projects
    // User.associate = models => {
    //     return models.User.belongsToMany(models.Project, {through: 'projects_members'});
    // };

    return User;
};