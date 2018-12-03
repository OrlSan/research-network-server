module.exports = (sequelize, type) => {
    const User = sequelize.define('User', {
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

    User.associate = models => {
        models.User.belongsTo(models.Institution);
        models.User.belongsToMany(models.Publication, {through: 'Publications_Authors'});
        models.User.hasMany(models.Project, {as: 'Projects'});
        models.User.belongsToMany(models.Project, {through: 'Projects_Members'});
    };

    return User;
};