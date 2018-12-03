module.exports = (sequelize, type) => {
    const Project = sequelize.define('project', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: type.STRING
        },
        status: {
            type: type.STRING
        },
        id_responsable: {
            type: type.INTEGER,
            allowNull: false
        }
    });

    // One project has one user as responsable
    // Project.associate = models => {
    //     return models.Project.belongsTo(models.User);
    // };
    // // One project can have multiple members(users) 
    // Project.associate = models => {
    //     return models.Project.belongsToMany(models.User, {throuh: 'projects_members'});
    // };

    return Project;
};
