module.exports = function (sequelize, DataTypes) {
    const Email = sequelize.define('Email', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        threadId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
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
        }
    });

    return Email;
}