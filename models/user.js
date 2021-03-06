module.exports = (sequelize, type) => {
    const User = sequelize.define('User', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        lastname: {
            type: type.STRING,
            allowNull: false
        },
        date_birth: {
            type: type.DATE,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false,
            validate: { 
                isEmail: true
            },
            unique: true
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
        token: {
            type: type.STRING
        },
        profile: {
            type: type.STRING,
            allowNull: false,
            validate: { 
                isIn: [['ADMIN', 'RESEARCHER', 'STUDENT']]
            }
        }
    }, {
        underscored: true
    });

    User.associate = models => {
        models.User.belongsTo(models.Institution); // User can have an institution
        models.User.belongsToMany(models.Publication, {through: 'Publications_Authors'}); // User can have many publications
        models.User.hasMany(models.Project, {
            foreignKey: {
                field: 'representant_id',
                allowNull: false
            }
        }); // User can be representant of many projects
        models.User.belongsToMany(models.Project, {through: 'Projects_Members'}); // User can be member of many projects
    };

    User.beforeCreate(function(model, options) {
        return model.generateHash(model.password)
        .then(hash => {
            model.password = hash;
        })
        .catch(() => {
            throw new Error('Error With Hashing Passwords'); 
        });
    });

    User.prototype.generateHash = (password) => {
        return bcrypt.hash(password, 10);
    };

    User.prototype.validatePassword = (password, user) => {
        bcrypt.compare(password, user.password);
    };

    User.prototype.basicFormat = function basicFormat() {
        return {
          name: this.name,
          lastname: this.lastname,
          date_birth: this.date_birth,
          email: this.email,
          profile: this.profile
        };
      };

    return User;
};
