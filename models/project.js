module.exports = (sequelize, type) => {
    return sequelize.define('project', {
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
        responsable: {
            type: type.STRING
        }
    })
}
