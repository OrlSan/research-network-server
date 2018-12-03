module.exports = (sequelize, type) => {
    const Area = sequelize.define('area', {
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
        image_url: {
            type: type.STRING
        }
    });

    // Area.associate = models => {
    //     return models.Area.hasMany(models.Publication, {as: 'Publications'});
    // };
    // Area.associate = models => {
    //     return models.Area.belongsToMany(models.Publication, {through: 'publications_areas'});
    // };

    return Area;
};
