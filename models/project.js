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
        },
        description: {
            type: type.STRING
        },
        status: {
            type: type.STRING
        }
    }, {
        underscored: true
    });

    Project.associate = models => {
        models.Project.belongsTo(models.User, {
            foreignKey: {
                field: 'representant_id',
                allowNull: false
            }
        });
        models.Project.belongsToMany(models.User, {through: 'Projects_Members'});
    };

    Project.prototype.basicFormat = function basicFormat() {
        return {
          name: this.name,
          description: this.description,
          status: this.status
        };
    };

    return Project;
};
