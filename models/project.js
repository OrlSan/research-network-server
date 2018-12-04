module.exports = (sequelize, type) => {
    const Project = sequelize.define('Project', {
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
        }
    });

    Project.associate = models => {
        models.Project.belongsTo(models.User);
        models.Project.belongsToMany(models.User, {through: 'Projects_Members'});
    };

    return Project;
};
