module.exports = (sequelize, type) => {
    return sequelize.define('publication', {
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
    })
}
