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
    })
}
