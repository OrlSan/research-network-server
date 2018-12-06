module.exports = (sequelize, type) => {
    const Institution = sequelize.define('Institution', {
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
    });

    // One institution can have many users/members
    Institution.associate = models => {
        return models.Institution.hasMany(models.User, {as: 'Members'});
    };

    Institution.prototype.basicFormat = function basicFormat() {
        return {
          name: this.name,
          faculty: this.faculty,
          country: this.country,
          state: this.state,
          email: this.email,
          address: this.address
        };
    };

    return Institution;
};