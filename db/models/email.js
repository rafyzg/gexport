module.exports = function (sequelize, DataTypes) {
    const Email = sequelize.define('Email', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  //unique constrain
        },
        threadId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderMail : {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        labels: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fileLink: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Email;
}