module.exports = (sequelize, type) => {
    const Publication = sequelize.define('Publication', {
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
            type: type.INTEGER,
            validate: { 
                isIn: [[0, 1]]
            }
        },
        abstract: {
            type: type.STRING(1234),
            allowNull: false,
        }
    }, {
        underscored: true
    });
    
    Publication.associate = models => {
        models.Publication.belongsToMany(models.User, {through: 'Publications_Authors'});
        models.Publication.belongsTo(models.Area);
        models.Publication.belongsToMany(models.Area, {through: 'Publications_Areas'});
    };

    Publication.prototype.basicFormat = function basicFormat() {
        return {
          title: this.title,
          type: this.type,
          is_public: this.is_public,
          abstract: this.abstract
        };
    };


    return Publication;
};
