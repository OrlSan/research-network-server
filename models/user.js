module.exports = (sequelize, type) => {
    return sequelize.define('user', {
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
        profile: {
            type: type.STRING,
            allowNull: false,
            unique: true
        }
    })
}