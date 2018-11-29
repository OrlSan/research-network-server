module.exports = (sequelize, type) => {
    return sequelize.define('area', {
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
    })
}
