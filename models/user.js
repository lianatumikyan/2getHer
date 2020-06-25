'use strict';

const {omit} = require('lodash');

const {hash} = require('../helpers/password');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {args: true},
                len: {args: [1, 50]}
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {args: true},
                len: {
                    args: [1, 50]
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {args: true}
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        }
    }, {
        tableName: 'users',
        timestamps: true
    });

    const encryptPasswordIfChanged = (user) =>{
        const password = user.password;
        if (password && user.changed('password')) {
            user.password = hash(password);
        }
    };

    User.beforeCreate(encryptPasswordIfChanged);
    User.beforeUpdate(encryptPasswordIfChanged);

    User.prototype.toJSON = function () {
       return omit({...this.get()}, ['password']);
    };

    return User;
};
