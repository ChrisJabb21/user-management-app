
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        role: Sequelize.STRING,
    }, {
        timestamps: false
    });
    return User;

};