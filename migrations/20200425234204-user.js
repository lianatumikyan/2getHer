'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            username: {
                allowNull: false,
                unique: true,
                type:  Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};
