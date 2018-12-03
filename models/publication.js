module.exports = (sequelize, type) => {
    const Publication = sequelize.define('publication', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
            type: type.STRING,
            allowNull: false,
        },
        type: {
            type: type.STRING,
            allowNull: false,
            validate: { 
                isIn: [['thesis', 'paper']]
            }
        },
        is_public: {
            type: type.INTEGER
        },
        abstract: {
            type: type.STRING(1234),
            allowNull: false,
        }
    });

    // Publication.associate = models => {
    //     return models.Publication.belongsToMany(models.User, {through: 'publications_authors'});
    // };
    // Publication.associate = models => {
    //     return models.Publication.belongsTo(models.Area);
    // };
    // Publication.associate = models => {
    //     return models.Publication.belongsToMany(models.Area, {through: 'publications_areas'});
    // };

    return Publication;
};
