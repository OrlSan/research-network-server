module.exports = (sequelize, type) => {
    return sequelize.define('institution', {
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
        faculty: {
            type: type.STRING,
            allowNull: false,
        },
        country: {
            type: type.STRING,
            allowNull: false,
        },
        state: {
            type: type.STRING,
            allowNull: false,
        },
        email: {
            type: type.STRING,
            allowNull: false,
            validate: { 
                isEmail: true
            },
            unique: true
        },
        address: {
            type: type.STRING,
            allowNull: false
        }
    })
}