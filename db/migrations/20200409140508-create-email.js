'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('emails', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        emailId: {
            allowNull: false,
            unique: true,  //unique constrain
            type: Sequelize.STRING
        },
        threadId: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        from: {
            allowNull: false,
            type: Sequelize.STRING
        },
        title: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        labels: {
            allowNull: false,
            type: Sequelize.TEXT,
        },
        body: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        date: {
            allowNull: false,
            type: Sequelize.DATE
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('emails');
  }
};